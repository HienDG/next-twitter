import useSWR from "swr";
import type { User } from "@prisma/client";

import { fetcher } from "@src/helper";

type UserInformation = {
	followersCount: number | null;
} & User;

const useUserInformation = (userId?: string) => {
	const { data, error, isLoading, mutate } = useSWR<UserInformation, Error>(
		//If the function throws or returns a falsy value, SWR will not start the request
		() => (userId ? `/api/users/${userId}` : null),

		fetcher
	);

	return {
		userInformation: data,
		error,
		isLoading,
		mutateUserInformation: mutate,
	};
};

export default useUserInformation;
