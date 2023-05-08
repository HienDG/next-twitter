import prisma from "@libs/prisma";
import { updateUser } from "@libs/collections";

const createNotification = async (
	userId: string,
	message: string = "Someone replied on your tweet!"
) => {
	await prisma.notification.create({
		data: {
			body: message,
			userId: userId,
		},
	});

	await updateUser(userId, {
		hasNotification: true,
	});
};

export default createNotification;
