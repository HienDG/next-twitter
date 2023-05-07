import React from "react";
import { useRouter } from "next/router";

import { Header } from "@src/components/user";
import { PostItem, Tweet, Comments } from "@src/components/posts";
import { Loader } from "@src/components/ui";

import { useFetchSinglePost } from "@src/hooks";

interface PostViewProps {}

const PostView: React.FC<PostViewProps> = () => {
	const { postId } = useRouter().query;
	const { post, isLoading } = useFetchSinglePost(postId as string);

	return (
		<div className="w-full h-full">
			{!post || isLoading ? (
				<Loader size={50} />
			) : (
				<div className="mb-5">
					<Header showBackArrowIcon label="Tweet" />
					<PostItem post={post} />
					<Tweet isComment postId={postId as string} placeholder="Tweet your reply" />
					<Comments comments={post.comments} />
				</div>
			)}
		</div>
	);
};
export default PostView;
