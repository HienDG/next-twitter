import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";

const getPosts = async (where?: Prisma.PostWhereInput) => {
	return await prisma.post.findMany({
		where: { ...where },
		include: {
			user: {
				select: {
					email: true,
					id: true,
					username: true,
					name: true,
				},
			},
			comments: {
				select: {
					id: true,
					body: true,
					userId: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { userId } = req.query;

	if (isString(userId)) {
		const getAllUserPost = await getPosts({
			userId: userId,
		});

		return res.status(200).json(getAllUserPost);
	}

	const getAllPosts = await getPosts();

	return res.status(200).json(getAllPosts);
});

export default handler;
