import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type Data = {
	email: string;
	password: string;
};

const signInWithCredentials = (data: Data) =>
	signIn("credentials", {
		...data,
		redirect: false,
	}).then((data) => {
		if (data && data.ok) {
			toast.success("You are successfully logged in");
		} else {
			toast.error("Credentials do not match!");
		}

		return data;
	});

export default signInWithCredentials;
