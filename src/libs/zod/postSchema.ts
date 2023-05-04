import { z } from "zod";
const postSchema = z
	.object({
		body: z.string().max(255, "Password cannot exceed more than 255 characters"),
	})
	.required();

export type PostFields = z.infer<typeof postSchema>;

export default postSchema;
