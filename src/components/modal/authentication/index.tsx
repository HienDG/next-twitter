import React, { Fragment } from "react";

import { ModalLayout } from "@src/components/layouts";
import SignUpModal from "./SignUp";
import SignInModal from "./SignIn";

import { useAuthModal } from "@src/hooks";

interface AuthenticationModalProps {}

const AuthenticationModal: React.FC<AuthenticationModalProps> = () => {
	const { onClose, view, onChangeModalView } = useAuthModal();

	return (
		<ModalLayout onClose={onClose} label={view === "sign-up" ? "Create an account" : "Login"}>
			<Fragment>
				<Fragment>{view === "sign-in" ? <SignInModal /> : null}</Fragment>
				<Fragment>{view === "sign-up" ? <SignUpModal /> : null}</Fragment>
			</Fragment>

			<div className="mt-4 text-center text-neutral-400">
				<p>
					<Fragment>
						{view === "sign-up" ? "Already have an account?" : "First time using Twitter?"}
					</Fragment>{" "}
					<span className="text-white cursor-pointer hover:underline" onClick={onChangeModalView}>
						{view === "sign-up" ? "Sign in" : "Create an account"}
					</span>
				</p>
			</div>
		</ModalLayout>
	);
};
export default AuthenticationModal;
