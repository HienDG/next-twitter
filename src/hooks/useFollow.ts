import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useUser, useUserInformation, useAuthModalStore } from "@src/hooks";

const useFollow = (userId: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { onOpen } = useAuthModalStore();
	const { loggedInUser, mutate } = useUser();
	const { mutateUserInformation } = useUserInformation(userId);

	const isFollowing = useMemo(
		() => (loggedInUser?.followingIds ? [...loggedInUser.followingIds].includes(userId) : false),
		[loggedInUser?.followingIds, userId]
	);

	const toggleFollow = useCallback(async () => {
		setIsLoading(true);
		if (!loggedInUser) return onOpen();

		try {
			let request;

			if (isFollowing) {
				request = () => axios.delete("/api/follow", { params: { userId } });
			} else {
				request = () => axios.post(`/api/follow?userId=${userId}`);
			}

			await request();
			mutate();
			mutateUserInformation();

			toast.success("Success");
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}

			toast.error("Something went wrong");
		}

		setIsLoading(false);
	}, [isFollowing, loggedInUser, mutate, mutateUserInformation, onOpen, userId]);

	return {
		toggleFollow,
		isFollowing,
		isLoading,
	};
};

export default useFollow;
