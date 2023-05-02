import type { NextPage } from "next";
import React from "react";

import { Header } from "@src/components/user";

interface NotificationsProps {}

const Notifications: NextPage<NotificationsProps> = () => {
	return (
		<div className="w-full">
			<Header label="Notifications" showBackArrowIcon />
		</div>
	);
};
export default Notifications;
