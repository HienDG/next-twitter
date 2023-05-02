import jwt from "jsonwebtoken";

type SignTokenArgs = string | Record<string, any>;

const signToken = (
	data:
		| string
		| {
				[key: string]: any;
		  }
) => {
	const payload =
		typeof data === "string"
			? {
					id: data,
			  }
			: data;

	return jwt.sign(payload, process.env["JWT_SECRET"] as string, {
		expiresIn: process.env["JWT_EXPIRES_IN"] as string,
	});
};

export default signToken;
