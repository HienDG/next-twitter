import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { fetcher } from "@src/helper";

const useUser = () => {
	const { data: session } = useSession();
	const { data, error, isLoading, mutate } = useSWR<User, Error>(
		//If the function throws or returns a falsy value, SWR will not start the request
		() => (session ? "/api/loggedInUser" : null),

		fetcher
	);

	return {
		loggedInUser: data,
		error,
		isLoading,
		mutate,
	};
};

export default useUser;
