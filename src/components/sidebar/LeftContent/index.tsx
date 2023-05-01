import React, { Fragment } from "react";
import { signOut } from "next-auth/react";

import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import Logo from "./Logo";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import TweetButton from "./TweetButton";

import { useUser } from "@src/hooks";

const LeftContent: React.FC = () => {
	const { loggedInUser } = useUser();

	return (
		<aside className="h-full col-span-1 md:pr-6">
			<div className="flex flex-col items-end">
				<div className="space-y-4 lg:w-[230px]">
					{/* Logo */}
					<Logo />

					{/*  Menu */}
					<Menu>
						<MenuItem icon={BsHouseFill} label="Home" href="/" />

						<MenuItem
							icon={BsBellFill}
							label="Notifications"
							href="/notifications"
							alert={loggedInUser?.hasNotification}
							isProtected
						/>

						<MenuItem
							icon={FaUser}
							label="Profile"
							href={`/users/${loggedInUser?.id}`}
							isProtected
						/>

						<Fragment>
							{loggedInUser ? (
								<MenuItem icon={BiLogOut} label="Log out" onClick={() => signOut()} />
							) : null}
						</Fragment>
					</Menu>

					{/* Tweet button */}
					<Fragment>{loggedInUser ? <TweetButton /> : null}</Fragment>
				</div>
			</div>
		</aside>
	);
};
export default LeftContent;
