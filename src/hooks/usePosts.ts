import useSWR from "swr";
import { User, Post, Comment } from "@prisma/client";

import { fetcher } from "@src/helper";

type Posts = Post & {
	user: User;
	comments: Comment[];
};

const usePosts = (userId?: string) => {
	const { data, error, isLoading, mutate } = useSWR<Posts[], Error>(
		() => (userId ? `/api/posts?userId=${userId}` : "/api/posts"),

		fetcher
	);

	return {
		posts: data,
		error,
		isLoading,
		mutate,
	};
};

export default usePosts;
