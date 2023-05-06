import React, { Fragment, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";

import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import { Avatar } from "@src/components/ui";

import { type PostObject } from "@src/hooks";

interface PostItemProps {
	post: PostObject;
	userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, userId }) => {
	return (
		<div
			//   onClick={goToPost}
			className="p-5 transition border-b cursor-pointer border-neutral-800 hover:bg-neutral-900"
		>
			<div className="flex flex-row items-start gap-4">
				<div>
					<Avatar userId={post.user.id} />
				</div>

				<div>
					<div className="flex flex-row items-center gap-2">
						<p
							//  onClick={goToUser}
							className="font-semibold text-white cursor-pointer hover:underline"
						>
							{post.user.name}
						</p>
						<span
							//  onClick={goToUser}
							className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
						>
							@{post.user.username}
						</span>
						<span className="text-sm text-neutral-500">{/* {createdAt} */}</span>
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
					<div className="flex flex-row items-center gap-10 mt-3">
						<div className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-sky-500">
							<AiOutlineMessage size={20} />
							<p>{post.comments?.length || 0}</p>
						</div>
						<div
							//  onClick={onLike}
							className="flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-red-500"
						>
							<AiFillHeart color={"red"} size={20} />
							<p>{post.likedIds.length}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PostItem;
