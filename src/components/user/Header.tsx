import React from "react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
	showBackArrowIcon?: boolean;
	label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrowIcon, label }) => {
	const router = useRouter();

	const handleBack = useCallback(() => router.back(), [router]);

	return (
		<header className="border-b-[1px] border-neutral-800 p-5">
			<div className="flex flex-row items-center gap-5">
				{showBackArrowIcon && (
					<BiArrowBack
						onClick={handleBack}
						color="white"
						size={20}
						className="transition rounded-full cursor-pointer hover:opacity-70"
					/>
				)}

				<h1 className="text-xl font-semibold text-white">{label}</h1>
			</div>
		</header>
	);
};
export default Header;
