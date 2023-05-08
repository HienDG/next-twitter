import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors, isString } from "@src/helper";
import { updateUser, getAllNotifications } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { userId } = req.query;

	if (!isString(userId)) throw new Error("Invalid User Id");

	const notifications = await getAllNotifications({
		userId,
	});

	await updateUser(userId, {
		hasNotification: false,
	});

	return res.status(200).json(notifications);
});

export default handler;
