import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";
import { authOptions } from "@libs/next-auth";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const severSession = await getServerSession(req, res, authOptions);

	if (severSession?.user.email) {
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
			take: 3,
		});

		return res.status(200).json(users);
	}

	const users = await prisma.user.findMany({
		orderBy: {
			createdAt: "desc",
		},

		skip: 0,
		take: 3,
	});

	return res.status(200).json(users);
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};

export default handler;
