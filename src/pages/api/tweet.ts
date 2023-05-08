import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors, isString } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";
import { createPost, type PostCreateData } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);

	const { body, image } = req.body;

	if (!isString(body)) throw new Error("Invalid Post Content");

	const newPost: PostCreateData = {
		body,
		image: image,
		userId: loggedInUser.id,
	};

	const post = await createPost(newPost);

	return res.status(200).json(post);
});

export default handler;
