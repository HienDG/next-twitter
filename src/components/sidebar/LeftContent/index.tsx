import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import Logo from "./Logo";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import TweetButton from "./TweetButton";

const LeftContent: React.FC = () => {
	const router = useRouter();

	return (
		<aside className="h-full col-span-1 pr-4 md:pr-6">
			<div className="flex flex-col items-end">
				<div className="space-y-4 lg:w-[230px]">
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<Menu>
						<MenuItem icon={BsHouseFill} label="Home" onClick={() => router.push("/")} />

						<MenuItem
							icon={BsBellFill}
							label="Notifications"
							onClick={() => router.push("/notifications")}
						/>

						<MenuItem icon={FaUser} label="Profile" onClick={() => router.push("/users/id")} />

						<MenuItem icon={BiLogOut} label="Log out" onClick={() => signOut()} />
					</Menu>

					{/* Tweet button */}

					<TweetButton />
				</div>
			</div>
		</aside>
	);
};
export default LeftContent;
