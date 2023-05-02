import NextAuth, { type AuthOptions } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@libs/prisma";
import { signToken } from "@src/helper";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials");

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user?.hashedPassword) throw new Error("Invalid credentials");

				const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

				const token = signToken({
					email: user.email,
					name: user.name,
					id: user.id,
					image: user.coverImage,
				});

				if (!isCorrectPassword) throw new Error("Invalid credentials");

				return {
					email: user.email,
					name: user.name,
					id: user.id,
					image: user.coverImage,
					token,
				};
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // 1 day
	},
	jwt: {
		secret: process.env["NEXTAUTH_JWT_SECRET"] as string,
	},
	secret: process.env["NEXTAUTH_SECRET"] as string,

	callbacks: {
		async jwt({ token, user, account }) {
			if (user && account) {
				token.id = user.id;
				token.accessToken = user.token;
				token.name = user.name;
			}
			return token;
		},
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.accessToken = token.accessToken;
			}
			return session;
		},
	},
};

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
	return await NextAuth(req, res, authOptions);
};

export default auth;
