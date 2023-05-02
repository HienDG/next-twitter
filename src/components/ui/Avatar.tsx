import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";

interface AvatarProps {
	userId?: string;
	isLarge?: boolean;
	hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ isLarge = false, hasBorder = false, userId = "" }) => {
	return (
		<div
			className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      rounded-full 
      hover:opacity-90 
      transition 
      cursor-pointer
      relative
    `}
		>
			<Image
				fill
				style={{
					objectFit: "cover",
					borderRadius: "100%",
				}}
				alt="Avatar"
				src={"/images/placeholder.png"}
			/>
		</div>
	);
};
export default Avatar;