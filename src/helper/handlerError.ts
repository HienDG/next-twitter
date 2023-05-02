import { NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

export default function handlerError(error: unknown, res: NextApiResponse) {
	if (typeof error === "string") return res.status(400).json({ message: error });

	if (error instanceof Error) return res.status(400).json(error);

	if (error instanceof Prisma.PrismaClientKnownRequestError) return res.status(400).json(error);

	return res.status(405).end();
}
