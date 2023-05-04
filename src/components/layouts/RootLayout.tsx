import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Meta from "@src/components/meta";
import { AuthenticationModal, EditProfileModal } from "@src/components/modal";

import { useAuthModalStore, useEditModalStore } from "@src/hooks";

interface RootLayoutProps {
	children: React.ReactNode;
	session?: Session;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
	const { isOpen: isAuthModalOpen } = useAuthModalStore();
	const { isOpen: isEditModalOpen } = useEditModalStore();

	return (
		<SessionProvider session={session}>
			<Meta />

			<div className="min-h-screen bg-slate-900/50 scrollbar-hide">
				<div className="container h-screen mx-auto max-w-7xl xl:px-30">{children}</div>
			</div>

			<Fragment>{isAuthModalOpen ? <AuthenticationModal /> : null}</Fragment>
			<Fragment>{isEditModalOpen ? <EditProfileModal /> : null}</Fragment>
			<Toaster />
		</SessionProvider>
	);
};

export default RootLayout;
