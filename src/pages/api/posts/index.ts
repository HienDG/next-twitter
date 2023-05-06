import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { userId } = req.query;

	if (isString(userId)) {
		const getAllUserPost = await prisma.post.findMany({
			where: {
				userId: userId,
			},
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

		return res.status(200).json(getAllUserPost);
	}

	const getAllPosts = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
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
	});

	return res.status(200).json(getAllPosts);
});

export default handler;
