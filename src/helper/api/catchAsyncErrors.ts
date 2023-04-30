import type { NextApiRequest, NextApiResponse } from "next";

import handlerError from "./handlerError";

type AsyncCallback = (
	req: NextApiRequest,
	res: NextApiResponse
) => Promise<void | NextApiResponse<any>>;

const catchAsyncErrors =
	(handler: AsyncCallback) => async (req: NextApiRequest, res: NextApiResponse) =>
		handler(req, res).catch((error: unknown) => handlerError(error, res));

export default catchAsyncErrors;
