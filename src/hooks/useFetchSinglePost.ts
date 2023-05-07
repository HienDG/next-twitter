import useSWR from "swr";
import { Post } from "@prisma/client";

import { fetcher } from "@src/helper";

const useFetchSinglePost = (postId?: string) => {
	const { data, error, isLoading, mutate } = useSWR<Post, Error>(
		() => (postId ? `/api/posts/${postId}` : null),
		fetcher
	);

	return {
		post: data,
		error,
		isLoading,
		mutateSinglePost: mutate,
	};
};

export default useFetchSinglePost;
