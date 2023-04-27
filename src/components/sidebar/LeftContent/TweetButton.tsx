import React from "react";

import { FaFeather } from "react-icons/fa";

const TweetButton: React.FC = () => {
	return (
		<div className="w-full">
			<button className="flex items-center justify-center p-4 mt-6 transition rounded-full lg:hidden h-14 w-14 btn btn-primary">
				<FaFeather size={24} color="white" />
			</button>

			<button className="hidden w-full px-4 py-2 mt-6 rounded-full lg:block btn btn-primary">
				<p className="hidden text-lg font-semibold text-center text-white capitalize lg:block">
					Tweet
				</p>
			</button>
		</div>
	);
};
export default TweetButton;
