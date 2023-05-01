import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { Header, Hero, ProfileBio } from "@src/components/user";
import { PostFeed } from "@src/components/posts";
import { Loader } from "@src/components/ui";

import { useUserInformation } from "@src/hooks";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = ({}) => {
	const { query } = useRouter();
	const { userInformation, isLoading } = useUserInformation(query["id"] as string);

	return (
		<Fragment>
			{isLoading ? (
				<Loader />
			) : (
				<div className="w-full">
					<Header showBackArrowIcon label={userInformation?.username as string} />
					<Hero userId={query["id"] as string} />
					<ProfileBio userId={query["id"] as string} />
					<PostFeed userId={query["id"] as string} />
				</div>
			)}
		</Fragment>
	);
};
export default UserProfile;
