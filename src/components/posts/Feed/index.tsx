import React, { Fragment } from "react";

import PostItem from "./PostItem";
import { Loader } from "@src/components/ui";

import { usePosts } from "@src/hooks";

interface PostFeedProps {
	userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
	const { posts , isLoading } = usePosts(userId);

	return (
		<Fragment>
			{isLoading || typeof posts === "undefined" ? (
				<Loader
					size={50}
					wrapperClassName="h-[50vh] flex justify-center items-center"
					color="#2fa4f4"
				/>
			) : (
				<Fragment>
					{posts.map((post) => (
						<PostItem post={post} key={post.id} />
					))}
				</Fragment>
			)}
		</Fragment>
	);
};
export default PostFeed;
