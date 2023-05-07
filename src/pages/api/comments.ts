import type { NextApiRequest, NextApiResponse } from "next";
import type { User, Post } from "@prisma/client";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString, isValidPrismaDocument } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";
import { createNotification } from "./notification";

const isNotificationOnYourOwnTweet = ({ userId, post }: { userId: string; post: Post }) =>
	userId === post.userId;

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);
	const { body } = req.body;
	const { postId } = req.query;

	if (!isString(body)) throw new Error("Invalid Comment Content");
	if (!isString(postId)) throw new Error("Invalid Post Id");

	const comment = await prisma.comment.create({
		data: {
			body,
			userId: loggedInUser.id,
			postId,
		},
	});

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (
		isValidPrismaDocument(post) &&
		isString(post.userId) &&
		!isNotificationOnYourOwnTweet({ userId: loggedInUser.id, post })
	) {
		await createNotification(post.userId);
	}

	return res.status(200).json(comment);
});

export default handler;
