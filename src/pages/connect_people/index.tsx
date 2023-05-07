import React from "react";

import { Header } from "@src/components/user";

interface ConnectWithPeopleProps {}

const ConnectWithPeople: React.FC<ConnectWithPeopleProps> = ({}) => {
	return (
		<div className="relative">
			<Header label="Connect" showBackArrowIcon />
		</div>
	);
};
export default ConnectWithPeople;
