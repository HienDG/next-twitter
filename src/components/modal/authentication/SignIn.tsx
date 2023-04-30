import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { FormControl, InputField, Button } from "@src/components/ui";

import { signInSchema, type SignInFormFields, defaultSignInField } from "@libs/zod";
import { signInWithCredentials } from "@src/helper";
import { useAuthModal } from "@src/hooks";

const SignInModal: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { onClose } = useAuthModal();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInFormFields>({
		resolver: zodResolver(signInSchema),
		defaultValues: defaultSignInField,
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<SignInFormFields> = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const response = await signInWithCredentials({
				email,
				password,
			});

			if (response?.ok) return onClose();
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			}
			toast.error("Something went wrong");
		}

		setIsLoading(false);
		reset();
	};

	return (
		<FormControl onSubmit={handleSubmit(onSubmit)}>
			<InputField
				type="email"
				placeholder="Enter your Email"
				hasError={!!errors.email}
				errorMessage={errors.email?.message}
				{...register("email")}
			/>

			<InputField
				type="password"
				placeholder="Enter your Password"
				errorMessage={errors.password?.message}
				hasError={!!errors.password}
				{...register("password")}
			/>

			<Button
				className="w-full text-white capitalize rounded-full"
				variant="primary"
				type="submit"
				isLoading={isLoading}
			>
				Sign In
			</Button>
		</FormControl>
	);
};
export default SignInModal;
