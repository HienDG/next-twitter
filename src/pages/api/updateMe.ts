import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "PATCH") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);

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
