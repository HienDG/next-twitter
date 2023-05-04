import useSWR from "swr";

import type { User } from "@prisma/client";

import { fetcher } from "@src/helper";

const useFollowers = () => {
	const { data, error, isLoading, mutate } = useSWR<User[], Error>("/api/users", fetcher);

	return {
		followers: data,
		isLoading,
		error,
		mutate,
	};
};

export default useFollowers;
