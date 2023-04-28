import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, InputField, Button } from "@src/components/ui";

import { signInSchema, type SignInFormFields, defaultSignInField } from "@libs/zod";

const SignInModal: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormFields>({
		resolver: zodResolver(signInSchema),
		defaultValues: defaultSignInField,
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<SignInFormFields> = ({ email, password }) => {
		console.log(email, password);
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

			<Button className="w-full text-white capitalize rounded-full" variant="primary" type="submit">
				Sign In
			</Button>
		</FormControl>
	);
};
export default SignInModal;
