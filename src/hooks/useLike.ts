import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useUser, useAuthModalStore, useFetchSinglePost, usePosts } from "@src/hooks";

type Payload = {
	userId?: string;
	postId: string;
};

const useFollow = ({ userId, postId }: Payload) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { onOpen } = useAuthModalStore();
	const { loggedInUser } = useUser();
	const { post, mutateSinglePost } = useFetchSinglePost(postId);
	const { mutate: mutateAllPosts } = usePosts(userId);

	const hasLiked = useMemo(
		() => (post?.likedIds ? [...post.likedIds].includes(loggedInUser?.id as string) : false),
		[loggedInUser?.id, post?.likedIds]
	);

	const toggleLike = useCallback(async () => {
		setIsLoading(true);
		if (!loggedInUser) return onOpen();

		try {
			let request;

			// prevent users from liking their own posts
			if (post?.userId === loggedInUser.id) return null;

			if (hasLiked) {
				request = () => axios.delete("/api/like", { params: { postId } });
			} else {
				request = () => axios.post(`/api/like?postId=${postId}`);
			}

			await request();

			mutateSinglePost();
			mutateAllPosts();

			toast.success("Success");
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}

			toast.error("Something went wrong");
		}

		setIsLoading(false);
	}, [hasLiked, loggedInUser, mutateAllPosts, mutateSinglePost, onOpen, post?.userId, postId]);

	return {
		toggleLike,
		hasLiked,
		isLoading,
	};
};

export default useFollow;
