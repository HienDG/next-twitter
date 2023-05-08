import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";
import { updateUser, getAllNotifications, createNotification } from "@libs/collections";

const getAllUserNotifications = async (userId: string) =>
	await prisma.notification.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { userId } = req.query;

	if (!isString(userId)) throw new Error("Invalid User Id");

	const notifications = await getAllUserNotifications(userId);

	await updateUser(userId, {
		hasNotification: false,
	});

	return res.status(200).json(notifications);
});

export default handler;
