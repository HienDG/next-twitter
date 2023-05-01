import React, { Fragment } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Avatar } from "@src/components/ui";

import { useFollower } from "@src/hooks";

interface FollowListProps {}

const FollowList: React.FC<FollowListProps> = () => {
	const { data: session } = useSession();
	const { users } = useFollower();

	return (
		<div className="w-full overflow-hidden bg-neutral-800 rounded-2xl">
			<h2 className="px-6 py-4 text-xl font-semibold text-white">Who to follow</h2>
			<div className="flex flex-col pt-4 min-h-[200px] ">
				<Fragment>
					{users.map((user) => (
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

				<Link
					href={`/connect_people?userId=${session?.user.id}`}
					className="px-6 py-4 text-blue-700 cursor-pointer hover:bg-slate-300 hover:bg-opacity-10"
				>
					Show more
				</Link>
			</div>
		</div>
	);
};
export default FollowList;
