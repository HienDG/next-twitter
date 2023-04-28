import React from "react";

import { FaFeather } from "react-icons/fa";

import { Button } from "@src/components/ui";

const TweetButton: React.FC = () => {
	return (
		<div className="w-full">
			<Button className="mt-6 rounded-full lg:hidden h-14 w-14" variant="primary">
				<FaFeather size={24} color="white" />
			</Button>

			<Button className="hidden w-full px-4 py-2 mt-6 rounded-full lg:block" variant="primary">
				<p className="hidden text-lg font-semibold text-center text-white capitalize lg:block">
					Tweet
				</p>
			</Button>
		</div>
	);
};
export default TweetButton;
