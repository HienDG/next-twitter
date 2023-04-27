import React from "react";

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<div className="h-screen bg-slate-900/50 scrollbar-hide">
			<div className="container h-full max-w-6xl mx-auto xl:px-30">{children}</div>
		</div>
	);
};

export default RootLayout;
