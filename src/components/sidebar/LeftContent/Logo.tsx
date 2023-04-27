import React from "react";
import Link from "next/link";

import { BsTwitter } from "react-icons/bs";

const Logo: React.FC = () => {
	return (
		<Link
			href="/"
			className="flex items-center justify-center p-4 rounded-full cursor-pointer h-14 w-14 hover:bg-blue-300 hover:bg-opacity-10"
		>
			<BsTwitter size={28} color="white" />
		</Link>
	);
};
export default Logo;
