import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString, isValidPrismaDocument } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";
import { createNotification } from "./notifications/[userId]";

type PostUpdateData = Prisma.PostUpdateArgs["data"];

const getPost = async (postId: string) =>
	await prisma.post.findUnique({
		where: { id: postId },
	});

const updatePost = async (postId: string, postUpdateData: PostUpdateData) =>
	await prisma.post.update({
		where: {
			id: postId,
		},
		data: { ...postUpdateData },
	});

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST" && req.method !== "DELETE")
		return res.status(405).end(`Method ${req.method} Not Allowed`);

	let updatedLikedIds: string[];
	const { loggedInUser } = await getLoggedInUser(req, res);

	const { postId } = req.query;

	if (!isString(postId)) throw new Error("Invalid post ID");

	const post = await getPost(postId);

	if (!isValidPrismaDocument(post)) throw new Error("Invalid Post ID");

	updatedLikedIds = [...(post.likedIds || [])];

	if (req.method === "DELETE")
		updatedLikedIds = updatedLikedIds.filter((followingId) => followingId !== loggedInUser.id);

	if (req.method === "POST") {
		updatedLikedIds.push(loggedInUser.id);

		if (isString(post.userId)) {
			await createNotification(post.userId, "Someone liked your tweet!");
		}
	}

	const updatedPost = await updatePost(postId, {
		likedIds: [...updatedLikedIds],
	});

	res.status(200).json(updatedPost);
});

export default handler;
