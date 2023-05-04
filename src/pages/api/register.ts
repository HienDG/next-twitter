import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "@libs/prisma";
import { catchAsyncErrors } from "@src/helper";

const SALT_ROUNDS = 12;

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { email, password, username } = req.body;

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	const user = await prisma.user.create({
		data: {
			email,
			username,
			hashedPassword,
			name: (email as string).split("@")[0],
		},
	});

	return res.status(200).json(user);
});

export default handler;
