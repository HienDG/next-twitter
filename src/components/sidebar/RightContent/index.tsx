import React from "react";

import FollowList from "./FollowList";
import GroupAuthButton from "./GroupAuthButton";

import { useUser } from "@src/hooks";

const RightContent: React.FC = () => {
	const { loggedInUser } = useUser();

	return (
		<aside className="hidden mt-6 lg:block">
			{loggedInUser ? <FollowList /> : <GroupAuthButton />}
		</aside>
	);
};
export default RightContent;
