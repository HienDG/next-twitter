import React from "react";

import CommentItem from "./CommentItem";

import type { CommentObject } from "@src/hooks";

interface CommentsProps {
	comments?: CommentObject[];
}

const Comments: React.FC<CommentsProps> = ({ comments = [] }) => {
	return (
		<div>
			{comments.map((comment) => (
				<CommentItem comment={comment} key={comment.id} />
			))}
		</div>
	);
};
export default Comments;
