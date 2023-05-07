import React, { Fragment, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";

import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import { Avatar, Button } from "@src/components/ui";

import { type PostObject, useLike } from "@src/hooks";

interface PostItemProps {
	post: PostObject;
	userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, userId }) => {
	const router = useRouter();
	const { toggleLike, hasLiked } = useLike({ userId, postId: post.id });

	const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		toggleLike();
	};

	const navigateToTheUserProfile = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			return router.push(`/users/${post.user.id}`);
		},
		[post.user.id, router]
	);

	const navigateToThePostView = useCallback(() => {
		if (router.pathname !== "/posts/[postId]") return router.push(`/posts/${post.id}`);
	}, [post.id, router]);

	const createdAt = useMemo(() => {
		if (!post?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(post.createdAt));
	}, [post.createdAt]);

	return (
		<div
			onClick={navigateToThePostView}
			className="p-5 transition border-b cursor-pointer border-neutral-800 hover:bg-neutral-900"
		>
			<div className="flex flex-row items-start gap-4">
				<div onClick={navigateToTheUserProfile}>
					<Avatar userId={post.user.id} />
				</div>

				<div>
					<div className="flex flex-row items-center gap-2">
						<p
							onClick={navigateToTheUserProfile}
							className="font-semibold text-white cursor-pointer hover:underline"
						>
							{post.user.name}
						</p>
						<span
							onClick={navigateToTheUserProfile}
							className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
						>
							@{post.user.username}
						</span>
						<span className="text-sm text-neutral-500">{createdAt}</span>
					</div>

					<div className="mt-1 text-white break-all">{post.body}</div>

					<Fragment>
						{post.image ? (
							<div className="my-5">
								<Image
									src={post.image}
									width={300}
									height={400}
									alt="image"
									className="w-full h-full rounded-3xl"
								/>
							</div>
						) : null}
					</Fragment>
					<div className="flex flex-row items-center gap-4 mt-3">
						<Button
							className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-sky-500"
							variant="ghost"
						>
							<AiOutlineMessage size={20} />
							<p>{post.comments?.length || 0}</p>
						</Button>
						<Button
							onClick={handleLike}
							className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-red-500"
							variant="ghost"
						>
							<Fragment>
								{hasLiked ? (
									<AiFillHeart color={"red"} size={20} />
								) : (
									<AiOutlineHeart color={"red"} size={20} />
								)}
							</Fragment>
							<p>{post.likedIds.length}</p>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PostItem;
