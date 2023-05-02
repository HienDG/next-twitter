import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@libs/next-auth";

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
	return await NextAuth(req, res, authOptions);
};

export default auth;
