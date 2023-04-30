import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper/api";
import { authOptions } from "./auth/[...nextauth]";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const severSession = await getServerSession(req, res, authOptions);

	if (!severSession?.user.email) throw new Error("Not Signed in");

	const loggedInUser = await prisma.user.findUnique({
		where: {
			email: severSession.user.email,
		},
	});

	if (!loggedInUser) throw new Error("Not Signed In");

	return res.status(200).json(loggedInUser);
});

export default handler;
