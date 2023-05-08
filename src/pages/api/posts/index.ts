import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors, isString } from "@src/helper";
import { getAllPosts } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { userId } = req.query;

	if (isString(userId)) {
		const getAllUserPost = await getAllPosts({
			userId: userId,
		});

		return res.status(200).json(getAllUserPost);
	}

	const getPosts = await getAllPosts();

	console.log(getPosts);

	return res.status(200).json(getPosts);
});

export default handler;
