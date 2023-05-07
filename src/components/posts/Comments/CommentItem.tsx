import React, { useMemo, useCallback } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";

import { Avatar } from "@src/components/ui";

import { type CommentObject } from "@src/hooks";

interface CommentItemProps {
	comment: CommentObject;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	const router = useRouter();

	const navigateToTheUserProfile = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			return router.push(`/users/${comment.user.id}`);
		},
		[comment.user.id, router]
	);

	const createdAt = useMemo(() => {
		if (!comment?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(comment.createdAt));
	}, [comment.createdAt]);

	return (
		<div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
			<div className="flex flex-row items-start gap-3">
				<div onClick={navigateToTheUserProfile}>
					<Avatar userId={comment.user.id} />
				</div>
				<div>
					<div className="flex flex-row items-center gap-2">
						<p
							onClick={navigateToTheUserProfile}
							className="font-semibold text-white cursor-pointer hover:underline"
						>
							{comment.user.name}
						</p>
						<span
							onClick={navigateToTheUserProfile}
							className="hidden cursor-pointer text-neutral-500 hover:underline md:block"
						>
							@{comment.user.username}
						</span>
						<span className="text-sm text-neutral-500">{createdAt}</span>
					</div>
					<div className="mt-1 text-white">{comment.body}</div>
				</div>
			</div>
		</div>
	);
};
export default CommentItem;
