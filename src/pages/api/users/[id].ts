import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { id } = req.query;

	if (!isString(id)) throw new Error("Invalid user ID");

	const existingUser = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	const followersCount = await prisma.user.count({
		where: {
			followingIds: {
				has: id,
			},
		},
	});

	return res.status(200).json({ ...existingUser, followersCount });
});

export default handler;
