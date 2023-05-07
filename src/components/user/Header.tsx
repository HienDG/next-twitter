import React, { useCallback } from "react";
import { useRouter } from "next/router";

import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
	showBackArrowIcon?: boolean;
	label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrowIcon, label }) => {
	const router = useRouter();

	const handleBack = useCallback(() => router.back(), [router]);

	return (
		<header className="border-b-[1px] border-neutral-800 sticky backface-hidden top-0 bg-inherit z-50 w-full backdrop-blur-md">
			<div className="flex flex-row items-center h-full gap-5 p-5 bg-black bg-opacity-75 ">
				{showBackArrowIcon && (
					<BiArrowBack
						onClick={handleBack}
						color="white"
						size={20}
						className="transition rounded-full cursor-pointer hover:opacity-70"
					/>
				)}

				<h1 className="text-xl font-semibold text-white capitalize">{label}</h1>
			</div>
		</header>
	);
};
export default Header;
