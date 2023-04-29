import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

type AsyncCallback = (
	req: NextApiRequest,
	res: NextApiResponse
) => Promise<void | NextApiResponse<any>>;

const catchAsyncErrors =
	(handler: AsyncCallback) => async (req: NextApiRequest, res: NextApiResponse) =>
		handler(req, res).catch((error: unknown) => {
			if (error instanceof Error) {
				console.log(error.message);
			}

			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				res.status(401).json({
					message: error.message,
					code: error.code,
				});
			}

			res.status(405).end();
		});

export default catchAsyncErrors;
