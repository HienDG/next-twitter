import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isValidPrismaDocument } from "@src/helper";
import { authOptions } from "@libs/next-auth";
import { User } from "@prisma/client";

export const getLoggedInUser = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<{
	loggedInUser: User;
}> => {
	const severSession = await getServerSession(req, res, authOptions);

	if (!severSession?.user.email) throw new Error("Not Signed in");

	const loggedInUser = await prisma.user.findUnique({
		where: {
			email: severSession.user.email,
		},
	});

	if (!isValidPrismaDocument(loggedInUser)) throw new Error("Not Signed In");

	return { loggedInUser };
};

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);

	return res.status(200).json(loggedInUser);
});

export default handler;
