import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";
import { authOptions } from "@libs/next-auth";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const severSession = await getServerSession(req, res, authOptions);

	if (!severSession?.user.email) throw new Error("Not Signed in");

	const users = await prisma.user.findMany({
		// Filter emails not include email current user
		where: {
			NOT: [
				{
					email: {
						contains: severSession.user.email,
					},
				},
			],
		},

		orderBy: {
			createdAt: "desc",
		},

		skip: 0,
		take: 5,
	});

	return res.status(200).json(users);
});

export default handler;
