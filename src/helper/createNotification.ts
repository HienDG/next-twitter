import prisma from "@libs/prisma";

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

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			hasNotification: true,
		},
	});
};

export default createNotification;
