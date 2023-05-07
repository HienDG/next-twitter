import React from "react";

import { Avatar, Button } from "@src/components/ui";
import TweetForm from "./TweetForm";

import { useUser, useAuthModalStore } from "@src/hooks";

interface TweetProps {
	isComment?: boolean;
	placeholder?: string;
	postId?: string;
}

const Tweet: React.FC<TweetProps> = ({ isComment, postId, placeholder }) => {
	const { onOpen } = useAuthModalStore();
	const { loggedInUser } = useUser();

	return (
		<div className="border-b-[1px] border-neutral-800 px-5 py-2">
			{loggedInUser ? (
				<div className="flex flex-row gap-4 mb-3">
					<div>
						<Avatar userId={loggedInUser.id} />
					</div>
					<TweetForm
						isComment={isComment}
						postId={postId}
						placeholder={placeholder || "What's happening?"}
						sizes="md"
					/>
				</div>
			) : (
				<div className="py-10">
					<h1 className="mb-6 text-2xl font-bold text-center text-white">Welcome to Twitter</h1>
					<div className="flex flex-row items-center justify-center gap-6">
						<Button
							className="text-lg capitalize min-w-[100px] btn-circle"
							variant="primary"
							onClick={() => onOpen()}
						>
							Sign In
						</Button>

						<Button
							className="text-lg text-white capitalize btn-circle min-w-[100px]"
							outline
							onClick={() => onOpen("sign-up")}
						>
							Sign Up
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
export default Tweet;
