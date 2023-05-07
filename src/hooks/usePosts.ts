import useSWR from "swr";
import { User, Post, Comment } from "@prisma/client";

import { fetcher } from "@src/helper";

export type CommentObject = Comment & {
	user: User;
};

export type PostObject = Post & {
	user: User;
	comments: CommentObject[];
};

const usePosts = (userId?: string) => {
	const { data, error, isLoading, mutate } = useSWR<PostObject[], Error>(
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
