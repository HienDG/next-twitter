import React from "react";

import { Button } from "@src/components/ui";

import { useAuthModalStore } from "@src/hooks";

const GroupAuthButton: React.FC = () => {
	const { onOpen } = useAuthModalStore();

	return (
		<div className="w-full">
			<div className="p-4 border border-gray-700 border-solid rounded-xl ">
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
		</div>
	);
};
export default GroupAuthButton;
