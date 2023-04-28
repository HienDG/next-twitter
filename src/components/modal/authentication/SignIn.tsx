import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, InputField } from "@src/components/ui";

import { signInSchema, type SignInFormFields, defaultSignInField } from "@libs/zod";

interface SignInModalProps {}

const SignInModal: React.FC<SignInModalProps> = () => {
	const { register, handleSubmit } = useForm<SignInFormFields>({
		resolver: zodResolver(signInSchema),
		defaultValues: defaultSignInField,
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<SignInFormFields> = ({ email, password }) => {
		console.log(email, password);
	};

	return (
		<FormControl onSubmit={handleSubmit(onSubmit)}>
			<InputField label="Email" {...register("email")} />
			<InputField label="Password" {...register("password")} />

			<button className="w-full text-lg capitalize btn btn-primary rounded-xl">Sign Up</button>
		</FormControl>
	);
};
export default SignInModal;
