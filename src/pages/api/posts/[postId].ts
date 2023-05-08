import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors, isString } from "@src/helper";
import { getPostWithLimitFields } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { postId } = req.query;

	if (!isString(postId)) throw new Error("Invalid Post Id");

	const post = await getPostWithLimitFields({ id: postId });

	return res.status(200).json(post);
});

export default handler;
