import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors, isString, isValidPrismaDocument } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";

import { updateUser, getUser, createNotification } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST" && req.method !== "DELETE")
		return res.status(405).end(`Method ${req.method} Not Allowed`);

	let updatedFollowingIds: string[];

	const { userId } = req.query;

	const { loggedInUser } = await getLoggedInUser(req, res);

	if (!isString(userId)) throw new Error("Invalid User Id");

	const user = await getUser({
		id: userId,
	});

	if (!isValidPrismaDocument(user)) throw new Error("Invalid User Id");

	updatedFollowingIds = [...(user.followingIds || [])];

	if (req.method === "DELETE")
		updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

	if (req.method === "POST") {
		updatedFollowingIds.push(userId);

		await createNotification(userId, {
			userId,
			body: "Someone followed you!",
		});
	}

	const updatedCurrentUser = await updateUser(loggedInUser.id, {
		followingIds: [...updatedFollowingIds],
	});

	return res.status(200).json({ ...updatedCurrentUser });
});

export default handler;
