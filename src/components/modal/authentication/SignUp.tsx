import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

import { FormControl, InputField, Button } from "@src/components/ui";

import { signUpSchema, type SignUpFormFields, defaultSignUpField } from "@libs/zod";
import { useAuthModal } from "@src/hooks";

const SignUpModal: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { onClose } = useAuthModal();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpFormFields>({
		resolver: zodResolver(signUpSchema),
		defaultValues: defaultSignUpField,
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<SignUpFormFields> = async ({ email, password, username }) => {
		setIsLoading(true);
		try {
			await axios.post("/api/register", {
				email,
				password,
				username,
			});

			toast.success("Thanks for signing up. Your account has been created.");

			await signIn("credentials", {
				email,
				password,
			});

			onClose();
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error);
			}
			toast.error("Something went wrong");
		}
		setIsLoading(false);
		reset();
	};

	return (
		<FormControl onSubmit={handleSubmit(onSubmit)}>
			<InputField
				errorMessage={errors.username?.message}
				hasError={!!errors.username}
				placeholder="Username"
				{...register("username")}
			/>
			<InputField
				errorMessage={errors.email?.message}
				hasError={!!errors.email}
				placeholder="Email"
				type="email"
				{...register("email")}
			/>

			<InputField
				errorMessage={errors.password?.message}
				hasError={!!errors.password}
				placeholder="Password"
				type="password"
				{...register("password")}
			/>

			<InputField
				errorMessage={errors.confirmPassword?.message}
				hasError={!!errors.confirmPassword}
				placeholder="Confirm Password"
				type="password"
				{...register("confirmPassword")}
			/>

			<Button
				className="w-full text-lg capitalize rounded-full"
				variant="primary"
				isLoading={isLoading}
			>
				Sign Up
			</Button>
		</FormControl>
	);
};
export default SignUpModal;
