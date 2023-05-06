import React from "react";

import { LeftContent, RightContent } from "@src/components/sidebar";

interface MainContentLayoutProps {
	children: React.ReactNode;
}

const MainContentLayout: React.FC<MainContentLayoutProps> = ({ children }) => {
	return (
		<div className="grid min-h-screen grid-cols-4 gap-6">
			{/* Sidebar */}
			<LeftContent />

			{/* Content */}
			<main role="main" className="col-span-3 lg:col-span-2 border-x border-[#2F3336]">
				{children}
			</main>

			{/* Trending or follow bar */}
			<RightContent />
		</div>
	);
};
export default MainContentLayout;
