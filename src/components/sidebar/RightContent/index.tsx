import React from "react";

import { useAuthModal } from "@src/hooks";

interface RightContentProps {}

const RightContent: React.FC<RightContentProps> = () => {
	const { onOpen } = useAuthModal();

	return (
		<aside className="hidden px-6 py-4 lg:block">
			<div className="p-4 border border-gray-700 border-solid rounded-xl">
				<h2 className="text-xl font-bold text-center mb-7">Welcome to Twitter</h2>
				<div className="flex flex-col px-2 mb-4 space-y-5">
					<button
						className="text-lg capitalize rounded-full btn btn-primary"
						onClick={() => onOpen()}
					>
						Login
					</button>
					<button
						className="text-lg capitalize rounded-full btn btn-outline btn-primary"
						onClick={() => onOpen("sign-up")}
					>
						Create New Account
					</button>
				</div>
			</div>
		</aside>
	);
};
export default RightContent;
