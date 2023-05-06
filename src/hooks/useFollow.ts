import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useUser, useUserInformation, useAuthModalStore } from "@src/hooks";

const useFollow = (userId: string) => {
	const { onOpen } = useAuthModalStore();
	const { loggedInUser, mutate } = useUser();
	const { mutateUserInformation } = useUserInformation(userId);

	const isFollowing = useMemo(() => {
		return loggedInUser?.followingIds ? [...loggedInUser.followingIds].includes(userId) : false;
	}, [loggedInUser?.followingIds, userId]);

	const toggleFollow = useCallback(async () => {
		if (!loggedInUser) return onOpen();

		try {
			let request;

			if (isFollowing) {
				request = () => axios.put("/api/follow", { userId });
			} else {
				request = () => axios.post("/api/follow", { userId });
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
	}, [isFollowing, loggedInUser, mutate, mutateUserInformation, onOpen, userId]);

	return {
		toggleFollow,
		isFollowing,
	};
};

export default useFollow;
