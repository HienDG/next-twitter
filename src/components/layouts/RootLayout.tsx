import React, { Fragment } from "react";

import Meta from "@src/components/meta";
import { AuthenticationModal } from "@src/components/modal";

import { useAuthModal } from "@src/hooks";

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	const { isOpen } = useAuthModal();

	return (
		<Fragment>
			<Meta />

			<div className="h-screen bg-slate-900/50 scrollbar-hide">
				<div className="container h-full mx-auto max-w-7xl xl:px-30">{children}</div>
			</div>
			<Fragment>{isOpen ? <AuthenticationModal /> : null}</Fragment>
		</Fragment>
	);
};

export default RootLayout;
