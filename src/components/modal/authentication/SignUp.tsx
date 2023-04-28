import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, InputField, Button } from "@src/components/ui";

import { signUpSchema, type SignUpFormFields, defaultSignUpField } from "@libs/zod";

const SignUpModal: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormFields>({
		resolver: zodResolver(signUpSchema),
		defaultValues: defaultSignUpField,
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<SignUpFormFields> = ({ email, password }) => {
		console.log(email, password);
	};

	return (
		<FormControl onSubmit={handleSubmit(onSubmit)}>
			<InputField
				errorMessage={errors.username?.message}
				hasError={!!errors.username}
				{...register("username")}
				placeholder="Username"
			/>
			<InputField
				errorMessage={errors.email?.message}
				hasError={!!errors.email}
				{...register("email")}
				placeholder="Email"
				type="email"
			/>
			<InputField
				errorMessage={errors.password?.message}
				hasError={!!errors.password}
				{...register("password")}
				placeholder="Password"
				type="password"
			/>
			<InputField
				errorMessage={errors.confirmPassword?.message}
				hasError={!!errors.confirmPassword}
				{...register("confirmPassword")}
				placeholder="Confirm Password"
				type="password"
			/>

			<Button className="w-full text-lg capitalize rounded-full" variant="primary">
				Sign Up
			</Button>
		</FormControl>
	);
};
export default SignUpModal;
