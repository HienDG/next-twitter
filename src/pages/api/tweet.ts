import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prisma";
import { catchAsyncErrors, isString } from "@src/helper";
import { getLoggedInUser } from "./loggedInUser";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { loggedInUser } = await getLoggedInUser(req, res);

	const { body, image } = req.body;

	if (!isString(body)) throw new Error("Invalid Post Content");

	const post = await prisma.post.create({
		data: {
			body,
			image: image,
			userId: loggedInUser.id,
		},
	});

	return res.status(200).json(post);
});

export default handler;
