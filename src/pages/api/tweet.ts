import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);

	const { body } = req.body;

	if (typeof body !== "string") throw new Error("Invalid Post Content");

	const post = await prisma.post.create({
		data: {
			body,
			userId: loggedInUser.id,
		},
	});

	return res.status(200).json(post);
});

export default handler;
