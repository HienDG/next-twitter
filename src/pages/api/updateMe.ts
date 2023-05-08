import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";
import { updateUser, type UserUpdateData } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "PATCH") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);

	const { name, username, bio, coverImage, profileImage } = req.body;

	const newUserInformation: UserUpdateData = { name, username, bio, profileImage, coverImage };

	const updatedUser = await updateUser(loggedInUser.id, newUserInformation);

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
