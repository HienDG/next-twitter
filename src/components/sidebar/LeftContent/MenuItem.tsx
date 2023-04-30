import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

import type { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

import { useAuthModal, useUser } from "@src/hooks";

interface MenuItemProps {
	icon: IconType;
	alert?: boolean | null;
	label?: string;
	onClick?: () => void;
	isProtected?: boolean;
	href?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
	label = "",
	icon: Icon,
	alert = false,
	onClick,
	isProtected = false,
	href = "/",
}) => {
	const router = useRouter();
	const { onOpen } = useAuthModal();
	const { loggedInUser } = useUser();

	const menuItemClasses = clsx(
		"relative rounded-full p-4 items-center cursor-pointer hover:bg-slate-300 hover:bg-opacity-10"
	);

	const dotClasses = clsx("absolute left-0 text-sky-500 -top-4");

	const handleClick = () => {
		if (isProtected && !loggedInUser) return onOpen();
		if (onClick) return onClick();
		if (href) return router.push(href);
	};

	return (
		<div className="flex items-center flex-grow" onClick={handleClick}>
			{/* responsive for Mobile or tablet device */}
			<div className={`${menuItemClasses} flex justify-center h-14 w-14 lg:hidden`}>
				<Icon size={28} color="white" />
				{alert ? <BsDot className={dotClasses} size={70} /> : null}
			</div>

			{/* responsive for Pc */}
			<div className={`${menuItemClasses} lg:flex gap-4 hidden`}>
				<Icon size={24} color="white" />
				<p className="hidden text-xl text-white lg:block">{label}</p>
				{alert ? <BsDot className={dotClasses} size={70} /> : null}
			</div>
		</div>
	);
};
export default MenuItem;
