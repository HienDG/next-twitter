import { z } from "zod";
const signInSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: "This field has to be filled." })
			.email("This is not a valid email."),
		password: z
			.string()
			.min(4, { message: "Password length should be at least 4 characters" })
			.max(12, "Password cannot exceed more than 12 characters"),
	})
	.required();

export type SignInFormFields = z.infer<typeof signInSchema>;

export const defaultSignInField: SignInFormFields = {
	email: "",
	password: "",
};

export default signInSchema;
