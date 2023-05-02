import { z } from "zod";

const editProfileSchema = z.object({
	username: z.string().min(1, { message: "This field has to be filled." }).optional(),
	name: z.string().min(1, { message: "This field has to be filled." }).optional(),
	bio: z.string().min(1, { message: "This field has to be filled." }).optional(),
});

export type EditProfileFormFields = z.infer<typeof editProfileSchema>;

export const defaultEditProfileField: EditProfileFormFields = {
	name: "",
	username: "",
	bio: "",
};

export default editProfileSchema;
