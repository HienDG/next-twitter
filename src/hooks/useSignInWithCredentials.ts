import { useState, useCallback, useEffect } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";

import useAuthModalStore from "./useAuthModalStore";

type Credentials = { email: string; password: string };

type Options = {
	toast: {
		success?: string;
		error?: string;
	};
};

const useSignInWithCredentials = (
	options?: Options
): [(credentials: Credentials) => Promise<void>, SignInResponse | null] => {
	const [response, setResponse] = useState<SignInResponse | null>(null);
	const { onClose } = useAuthModalStore();

	const signInWithCredentials = useCallback(
		(credentials: Credentials) =>
			signIn("credentials", {
				...credentials,
				redirect: false,
			}).then((res) => {
				if (res && res.ok) {
					setResponse(res);
				} else {
					toast.error(options?.toast.error || "Credentials do not match!");
				}
			}),

		[options?.toast.error]
	);

	useEffect(() => {
		if (response?.ok) {
			toast.success(options?.toast.success || "You are successfully logged in");
			onClose();
		}

		return () => setResponse(null);
	}, [onClose, options?.toast.success, response?.ok]);

	return [signInWithCredentials, response];
};

export default useSignInWithCredentials;
