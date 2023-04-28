import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, InputField } from "@src/components/ui";

import { signUpSchema, type SignUpFormFields, defaultSignUpField } from "@libs/zod";

const SignUpModal: React.FC = () => {
	const { register, handleSubmit } = useForm<SignUpFormFields>({
		resolver: zodResolver(signUpSchema),
		defaultValues: defaultSignUpField,
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<SignUpFormFields> = ({ email, password }) => {
		console.log(email, password);
	};

	return (
		<FormControl onSubmit={handleSubmit(onSubmit)}>
			<InputField label="Username" {...register("username")} />
			<InputField label="Email" {...register("email")} />
			<InputField label="Password" {...register("password")} />
			<InputField label="Confirm Password" {...register("confirmPassword")} />

			<button className="w-full text-lg capitalize btn btn-primary rounded-xl">Sign Up</button>
		</FormControl>
	);
};
export default SignUpModal;
