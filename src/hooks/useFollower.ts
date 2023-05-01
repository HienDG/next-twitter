import useSWR from "swr";
import { useSession } from "next-auth/react";
import type { User } from "@prisma/client";

import { fetcher } from "@src/helper";

const useFollower = () => {
	const { data: session } = useSession();
	const { data, error, isLoading, mutate } = useSWR<User[], Error>(
		//If the function throws or returns a falsy value, SWR will not start the request
		() => (session ? "/api/users" : null),

		fetcher
	);

	return {
		users: data || [],
		isLoading,
		error,
		mutate,
	};
};

export default useFollower;
