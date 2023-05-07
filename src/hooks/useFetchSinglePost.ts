import useSWR from "swr";

import { fetcher } from "@src/helper";
import type { PostObject } from "./usePosts";

const useFetchSinglePost = (postId?: string) => {
	const { data, error, isLoading, mutate } = useSWR<PostObject, Error>(
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
