import useSWR from "swr";
import type { Notification } from "@prisma/client";

import { fetcher } from "@src/helper";

const useFetchAllNotifications = (userId?: string) => {
	const { data, error, isLoading, mutate } = useSWR<Notification[], Error>(
		() => (userId ? `/api/notifications/${userId}` : null),

		fetcher
	);

	return {
		notifications: data,
		error,
		isLoading,
		mutateNotifications: mutate,
	};
};

export default useFetchAllNotifications;
