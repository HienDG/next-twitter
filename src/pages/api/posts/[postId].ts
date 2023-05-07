import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { postId } = req.query;

	if (!isString(postId)) throw new Error("Invalid Post Id");

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			user: {
				select: {
					name: true,
					username: true,
					email: true,
					id: true,
				},
			},
			comments: {
				include: {
					user: {
						select: {
							name: true,
							username: true,
							email: true,
							id: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	return res.status(200).json(post);
});

export default handler;
