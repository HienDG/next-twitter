import NextAuth, { type AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@libs/prisma";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [],
};

export default NextAuth(authOptions);
