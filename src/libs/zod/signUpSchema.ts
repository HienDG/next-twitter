import { z } from "zod";

const signUpSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: "This field has to be filled." })
			.max(12, "Username cannot exceed more than 12 characters"),
		email: z
			.string()
			.min(1, { message: "This field has to be filled." })
			.email("This is not a valid email."),
		password: z
			.string()
			.min(4, { message: "Password length should be at least 4 characters" })
			.max(24, "Password cannot exceed more than 24 characters"),
		confirmPassword: z
			.string()
			.min(4, { message: "Confirm password length should be at least 4 characters" })
			.max(14, "Confirm password cannot exceed more than 24 characters"),
	})
	.required()
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "The passwords did not match, Please try again",
				path: ["confirmPassword"],
			});
		}
	});

export type SignUpFormFields = z.infer<typeof signUpSchema>;

export const defaultSignUpField: SignUpFormFields = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default signUpSchema;
