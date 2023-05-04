import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Avatar } from "@src/components/ui";
import { Button } from "@src/components/ui";

import { useUser, useAuthModalStore } from "@src/hooks";

interface CreateNewPostProps {
	placeholder: string;
}

const CreateNewPost: React.FC<CreateNewPostProps> = ({ placeholder }) => {
	const { onOpen } = useAuthModalStore();
	const { loggedInUser } = useUser();

	return (
		<div className="border-b-[1px] border-neutral-800 px-5 py-2">
			{loggedInUser ? (
				<div className="flex flex-row gap-4 mb-3">
					<div>
						<Avatar userId={loggedInUser.id} />
					</div>
					<div className="w-full">
						<textarea
							className="disabled:opacity-80 peer resize-none mt-3 w-full bg-inherit ring-0 outline-none text-[20px] placeholder-neutral-500 text-white px-4"
							placeholder={placeholder}
						></textarea>
						<hr className=" opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
						<div className="flex flex-row justify-end mt-4">
							<Button size="sm" variant="primary" className="rounded-full min-w-[100px]">
								Tweet
							</Button>
						</div>
					</div>
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
export default CreateNewPost;
