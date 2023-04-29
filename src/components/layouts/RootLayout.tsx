import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import Meta from "@src/components/meta";
import { AuthenticationModal } from "@src/components/modal";

import { useAuthModal } from "@src/hooks";

interface RootLayoutProps {
	children: React.ReactNode;
	session?: Session;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
	const { isOpen } = useAuthModal();

	return (
		<SessionProvider session={session}>
			<Meta />

			<div className="h-screen bg-slate-900/50 scrollbar-hide">
				<div className="container h-full mx-auto max-w-7xl xl:px-30">{children}</div>
			</div>
			<Fragment>{isOpen ? <AuthenticationModal /> : null}</Fragment>
			<Toaster />
		</SessionProvider>
	);
};

export default RootLayout;
