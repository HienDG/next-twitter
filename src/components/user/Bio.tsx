import React, { useMemo } from "react";
import { format } from "date-fns";

import { BiCalendar } from "react-icons/bi";

import { Button } from "@src/components/ui";

import { useUser, useUserInformation, useEditModalStore, useFollow } from "@src/hooks";

interface ProfileBioProps {
	userId: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ userId }) => {
	const { isFollowing, toggleFollow, isLoading } = useFollow(userId);
	const { loggedInUser } = useUser();
	const { userInformation } = useUserInformation(userId);
	const { onOpen } = useEditModalStore();

	const createdAt = useMemo(() => {
		if (!userInformation?.createdAt) return null;

		return format(new Date(userInformation.createdAt), "MMMM yyyy");
	}, [userInformation?.createdAt]);

	return (
		<div className="border-b-[1px] border-neutral-800 pb-4">
			<div className="flex justify-end p-2">
				{loggedInUser?.id === userId ? (
					<Button
						outline
						className="min-w-[36px] rounded-full px-4 text-white"
						size="sm"
						onClick={onOpen}
					>
						Edit Profile
					</Button>
				) : (
					<Button
						variant="primary"
						className="min-w-[100px] rounded-full px-4"
						size="sm"
						onClick={toggleFollow}
						isLoading={isLoading}
					>
						{isLoading ? null : isFollowing ? "unFollow" : "Follow"}
					</Button>
				)}
			</div>

			<div className="px-4 mt-8">
				<div className="flex flex-col">
					<p className="text-2xl font-semibold text-white">{userInformation?.name}</p>
					<p className="text-md text-neutral-500">@{userInformation?.username}</p>
				</div>
				<div className="flex flex-col mt-4">
					<p className="text-white">{userInformation?.bio}</p>
					<div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
						<BiCalendar size={24} />
						<p>Joined {createdAt}</p>
					</div>
				</div>
				<div className="flex flex-row items-center gap-6 mt-4">
					<div className="flex flex-row items-center gap-1">
						<p className="text-white">{userInformation?.followingIds?.length}</p>
						<p className="text-neutral-500">Following</p>
					</div>
					<div className="flex flex-row items-center gap-1">
						<p className="text-white">{userInformation?.followersCount || 0}</p>
						<p className="text-neutral-500">Followers</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfileBio;
