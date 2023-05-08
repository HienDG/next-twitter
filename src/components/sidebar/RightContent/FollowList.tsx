import React, { Fragment } from "react";
import Link from "next/link";
import type { User } from "@prisma/client";

import { Avatar } from "@src/components/ui";

interface FollowListProps {
	followers?: User[];
}

const FollowList: React.FC<FollowListProps> = ({ followers = [] }) => {
	return (
		<div className="flex flex-col w-full h-full max-h-[360px]">
			<h2 className="px-6 py-4 text-xl font-semibold text-center text-white">Who to follow</h2>
			<div className="flex flex-col mb-2">
				<Fragment>
					{followers.map((user) => (
						<Link
							key={user.id}
							className="flex flex-row gap-4 px-6 py-4 cursor-pointer group/user hover:bg-slate-300 hover:bg-opacity-10"
							href={{
								pathname: "/users/[id]",
								query: { id: user.id },
							}}
						>
							<Avatar userId={user.id} />
							<div className="flex flex-col overflow-hidden">
								<p className="text-sm font-semibold text-white first-letter:capitalize group-hover/user:underline">
									{user.name}
								</p>
								<p className="text-sm text-neutral-400">@{user.username}</p>
							</div>
						</Link>
					))}
				</Fragment>
			</div>
		</div>
	);
};
export default FollowList;
