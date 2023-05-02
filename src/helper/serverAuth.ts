import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@libs/prisma";
import { authOptions } from "@src/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const severSession = await getServerSession(req, res, authOptions);

	if (!severSession?.user.email) throw new Error("Not Signed in");

	const loggedInUser = await prisma.user.findUnique({
		where: {
			email: severSession.user.email,
		},
	});

	if (!loggedInUser) throw new Error("Not Signed In");

	return { loggedInUser };
};
export default serverAuth;
