import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString, isValidPrismaDocument } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";
import { createNotification } from "./notification";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST" && req.method !== "DELETE")
		return res.status(405).end(`Method ${req.method} Not Allowed`);

	let updatedFollowingIds: string[];

	const { userId } = req.query;

	const { loggedInUser } = await getLoggedInUser(req, res);

	if (!isString(userId)) throw new Error("Invalid User Id");

	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!isValidPrismaDocument(user)) throw new Error("Invalid User Id");

	updatedFollowingIds = [...(user.followingIds || [])];

	if (req.method === "DELETE")
		updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

	if (req.method === "POST") {
		updatedFollowingIds.push(userId);

		await createNotification(userId, "Someone followed you!");
	}

	const updatedCurrentUser = await prisma.user.update({
		where: {
			id: loggedInUser.id,
		},
		data: {
			followingIds: [...updatedFollowingIds],
		},
	});

	return res.status(200).json({ ...updatedCurrentUser });
});

export default handler;
