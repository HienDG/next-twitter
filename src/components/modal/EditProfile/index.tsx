import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

import { ModalLayout } from "@src/components/layouts";
import { FormControl, InputField, Button, ImageUpload } from "@src/components/ui";

import { useEditModalStore, useUserInformation, useUser } from "@src/hooks";
import { editProfileSchema, type EditProfileFormFields, defaultEditProfileField } from "@libs/zod";

interface EditProfileModalProps {}

const EditProfileModal: React.FC<EditProfileModalProps> = () => {
	const [profileImage, setProfileImage] = useState<string | null | undefined>(null);
	const [coverImage, setCoverImage] = useState<string | null | undefined>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { loggedInUser } = useUser();
	const { userInformation, mutateUserInformation } = useUserInformation(loggedInUser?.id);
	const { onClose } = useEditModalStore();

	const { register, reset, handleSubmit, setValue } = useForm<EditProfileFormFields>({
		defaultValues: defaultEditProfileField,
		resolver: zodResolver(editProfileSchema),
	});

	const onSubmit: SubmitHandler<EditProfileFormFields> = async (data) => {
		const { name, username, bio } = data;
		setIsLoading(true);
		try {
			await axios.patch("/api/updateMe", {
				name,
				username,
				bio,
				profileImage,
				coverImage,
			});

			await mutateUserInformation();

			toast.success("Updated Account Information");
			onClose();
		} catch (error) {
			toast.error("Something went wrong");
		}

		reset();
		setCoverImage(null);
		setProfileImage(null);
	};

	useEffect(() => {
		if (userInformation) {
			setProfileImage(userInformation.profileImage);
			setCoverImage(userInformation.coverImage);

			setValue("name", userInformation.name as string);
			setValue("username", userInformation.username as string);
			setValue("bio", userInformation.bio as string);
		}
	}, [setValue, userInformation]);

	return (
		<ModalLayout onClose={onClose} label="Edit your profile">
			<FormControl onSubmit={handleSubmit(onSubmit)}>
				<ImageUpload
					selectedFileUrl={profileImage}
					setSelectedFileUrl={setProfileImage}
					placeholder="Upload profile image"
				/>
				<ImageUpload
					setSelectedFileUrl={setCoverImage}
					selectedFileUrl={coverImage}
					placeholder="Upload cover image"
				/>

				<InputField placeholder="Name" {...register("name")} />
				<InputField placeholder="Username" {...register("username")} />
				<InputField placeholder="Bio" {...register("bio")} />

				<Button variant="primary" className="w-full" isLoading={isLoading}>
					Save
				</Button>
			</FormControl>
		</ModalLayout>
	);
};
export default EditProfileModal;
