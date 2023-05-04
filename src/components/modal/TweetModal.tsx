import React from "react";

import { ModalLayout } from "@src/components/layouts";
import { TweetForm } from "@src/components/posts";
import { Avatar } from "@src/components/ui";

import { useTweetModalStore, useUser } from "@src/hooks";

interface TweetModalProps {}

const TweetModal: React.FC<TweetModalProps> = () => {
	const { onClose } = useTweetModalStore();
	const { loggedInUser } = useUser();

	return (
		<ModalLayout onClose={onClose} className="w-full px-10">
			<div className="relative flex flex-col gap-4 mb-3">
				<div className="flex flex-row items-center gap-4">
					<Avatar userId={loggedInUser?.id} />
					<p className="text-lg text-white">@{loggedInUser?.username}</p>
				</div>
				<TweetForm placeholder="What's happening?" sizes="lg" />
			</div>
		</ModalLayout>
	);
};
export default TweetModal;
