import React from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import FollowList from "./FollowList";
import { Loader } from "@src/components/ui";

import { useFollowers } from "@src/hooks";

const RightContent: React.FC = () => {
	const { status } = useSession();
	const { followers } = useFollowers();

	return (
		<aside
			className={clsx({
				["hidden mt-6 lg:block "]: status === "authenticated",
				["hidden"]: status === "unauthenticated",
			})}
		>
			<div
				className={clsx("w-full overflow-hidden bg-neutral-800 rounded-2xl min-h-[250px]", {
					["flex justify-center items-center"]: status === "loading" || !followers,
				})}
			>
				{status === "loading" || !followers ? (
					<div className="flex flex-col gap-2">
						<Loader size={35} />
						<p>Loading...</p>
					</div>
				) : (
					<FollowList followers={followers} />
				)}
			</div>
		</aside>
	);
};
export default RightContent;
