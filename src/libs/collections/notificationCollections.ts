import { Prisma } from "@prisma/client";

import prisma from "@libs/prisma";
import { updateUser } from "@libs/collections";

export type NotificationWhereInput = Prisma.NotificationFindManyArgs["where"];
export type NotificationCreateInput = Prisma.NotificationCreateArgs["data"];

export const getAllNotifications = async (where: NotificationWhereInput) =>
	await prisma.notification.findMany({
		where,
		orderBy: {
			createdAt: "desc",
		},
	});

export const createNotification = async (userId: string, data: NotificationCreateInput) => {
	await prisma.notification.create({
		data,
	});

	await updateUser(userId, {
		hasNotification: true,
	});
};
