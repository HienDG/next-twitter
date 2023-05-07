import React, { Fragment, useEffect } from "react";

import { BsTwitter } from "react-icons/bs";
import { Loader } from "@src/components/ui";

import { useUser, useFetchAllNotifications } from "@src/hooks";

interface NotificationsFeedProps {}

const NotificationsFeed: React.FC<NotificationsFeedProps> = () => {
	const { loggedInUser, mutate } = useUser();
	const { notifications = [], isLoading } = useFetchAllNotifications(loggedInUser?.id);

	useEffect(() => {
		mutate();
	}, [mutate]);

	if (isLoading || !loggedInUser) {
		return (
			<div className="h-[500px]">
				<Loader size={40} />;
			</div>
		);
	}

	return (
		<Fragment>
			{notifications.length > 0 ? (
				<div className="flex flex-col">
					{notifications.map((notification) => (
						<div
							key={notification.id}
							className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
						>
							<BsTwitter color="white" size={32} />
							<p className="text-white">{notification.body}</p>
						</div>
					))}
				</div>
			) : (
				<div className="p-6 text-xl text-center text-neutral-600">No notifications</div>
			)}
		</Fragment>
	);
};
export default NotificationsFeed;
