import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { catchAsyncErrors, isString } from "@src/helper";
import { createNewUser, type UserCreateData } from "@libs/collections";

const SALT_ROUNDS = 12;

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const { email, password, username } = req.body;

	if (!isString(email)) throw new Error("Invalid email");

	const name = email.split("@")[0];

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	const newAccount: UserCreateData = {
		email,
		username,
		hashedPassword,
		name,
	};

	const user = await createNewUser(newAccount);

	return res.status(200).json(user);
});

export default handler;
