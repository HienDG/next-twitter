import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Meta from "@src/components/meta";

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	const { pathname } = useRouter();

	return (
		<Fragment>
			<Meta title={pathname} />

			<div className="h-screen bg-slate-900/50 scrollbar-hide">
				<div className="container h-full max-w-6xl mx-auto xl:px-30">{children}</div>
			</div>
		</Fragment>
	);
};

export default RootLayout;
