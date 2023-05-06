import React from "react";
import Image from "next/image";
import clsx from "clsx";

import { useUserInformation } from "@src/hooks";

interface AvatarProps {
	userId?: string;
	isLarge?: boolean;
	hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ isLarge = false, hasBorder = false, userId = "" }) => {
	const { userInformation } = useUserInformation(userId);

	const imageContainerClasses = clsx(
		"rounded-full hover:opacity-90 transition cursor-pointer relative",
		{
			["h-32"]: hasBorder,
			["h-12"]: !hasBorder,
			["w-32"]: isLarge,
			["w-12"]: !isLarge,
		}
	);

	return (
		<div className={imageContainerClasses}>
			<Image
				fill
				style={{
					objectFit: "cover",
					borderRadius: "100%",
				}}
				alt="Avatar"
				src={userInformation?.profileImage || "/images/placeholder.png"}
			/>
		</div>
	);
};
export default Avatar;
