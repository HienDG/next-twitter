import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";
import { User } from "@prisma/client";

const isValidUser = (payload: User | null): payload is User =>
	typeof payload === "object" && payload !== null;

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST" && req.method !== "PUT")
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	let updatedFollowingIds: string[];

	const { userId } = req.body;

	const { loggedInUser } = await getLoggedInUser(req, res);

	if (!isString(userId)) throw new Error("Invalid User Id");

	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!isValidUser(user)) throw new Error("Invalid User Id");

	updatedFollowingIds = [...(user.followingIds || [])];

	if (req.method === "PUT")
		updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

	if (req.method === "POST") updatedFollowingIds.push(userId);

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
