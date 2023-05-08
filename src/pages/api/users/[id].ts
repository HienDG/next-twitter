import type { NextApiRequest, NextApiResponse } from "next";

import { catchAsyncErrors, isString } from "@src/helper";
import { getNumberOfUserRecords, getUser } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { id } = req.query;

	if (!isString(id)) throw new Error("Invalid user ID");

	const existingUser = await getUser({
		id: id,
	});

	const followersCount = await getNumberOfUserRecords({
		followingIds: {
			has: id,
		},
	});

	return res.status(200).json({ ...existingUser, followersCount });
});

export default handler;
