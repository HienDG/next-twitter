import React from "react";
import type { NextPage, NextPageContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

import { Header } from "@src/components/user";
import NotificationsFeed from "@src/components/notifications";

const Notifications: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
	return (
		<div className="w-full">
			<Header label="Notifications" showBackArrowIcon />
			<NotificationsFeed />
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}

export default Notifications;
