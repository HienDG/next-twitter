import React from "react";

import { Button } from "@src/components/ui";

import { useAuthModal } from "@src/hooks";

const RightContent: React.FC = () => {
	const { onOpen } = useAuthModal();

	return (
		<aside className="hidden px-6 py-4 lg:block">
			<div className="p-4 border border-gray-700 border-solid rounded-xl">
				<h2 className="text-xl font-bold text-center mb-7">Welcome to Twitter</h2>
				<div className="flex flex-col px-2 mb-4 space-y-5">
					<Button
						className="text-lg text-white capitalize rounded-full"
						outline
						onClick={() => onOpen()}
					>
						Login
					</Button>

					<Button
						className="text-lg capitalize rounded-full"
						variant="primary"
						onClick={() => onOpen("sign-up")}
					>
						Create New Account
					</Button>
				</div>
			</div>
		</aside>
	);
};
export default RightContent;
