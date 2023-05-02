import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";
import { authOptions } from "@libs/next-auth";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "PATCH") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const severSession = await getServerSession(req, res, authOptions);

	if (!severSession?.user.email) throw new Error("Not Signed in");

	const loggedInUser = await prisma.user.findUnique({
		where: {
			email: severSession.user.email,
		},
	});

	if (!loggedInUser) throw new Error("Not Signed In");

	const { name, username, bio, coverImage, profileImage } = req.body;

	const updatedUser = await prisma.user.update({
		where: {
			id: loggedInUser.id,
		},
		data: {
			name,
			username,
			bio,
			profileImage,
			coverImage,
		},
	});

	return res.status(200).json(updatedUser);
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};

export default handler;
