import jwt from "jsonwebtoken";

const signToken = (id: string = "") =>
	jwt.sign({ id: id }, process.env["JWT_SECRET"] as string, {
		expiresIn: process.env["JWT_EXPIRES_IN"] as string,
	});

export default signToken;
