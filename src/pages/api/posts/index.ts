import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { userId } = req.query;

	if (typeof userId === "string") {
		const getAllUserPost = await prisma.post.findMany({
			where: {
				userId: userId,
			},
			include: {
				user: true,
				comments: true,
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
			comments: true,
			user: true,
		},
	});

	return res.status(200).json(getAllPosts);
});

export default handler;
