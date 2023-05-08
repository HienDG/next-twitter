import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { catchAsyncErrors } from "@src/helper";
import { authOptions } from "@libs/next-auth";
import { getAllUser } from "@libs/collections";

const handler = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).end(`Method ${req.method} Not Allowed`);

	const severSession = await getServerSession(req, res, authOptions);

	if (severSession?.user.email) {
		const users = await getAllUser({
			NOT: [
				{
					email: {
						contains: severSession.user.email,
					},
				},
			],
		});

		return res.status(200).json(users);
	}

	const users = await getAllUser();

	return res.status(200).json(users);
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};

export default handler;
