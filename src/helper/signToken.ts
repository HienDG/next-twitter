import jwt from "jsonwebtoken";

type SignTokenPayload = Record<string, any>;

const signToken = (payload: SignTokenPayload) => {
	return jwt.sign(payload, process.env["JWT_SECRET"] as string, {
		expiresIn: process.env["JWT_EXPIRES_IN"] as string,
	});
};

export default signToken;
