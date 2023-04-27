import React from "react";
import Head from "next/head";

interface MetaProps {
	title: string;
}

const Meta: React.FC<MetaProps> = ({ title = "Home" }) => {
	const generateTitle = (title: string): string => {
		if (title.length === 0) return "Home";

		if (title.includes("[id]")) return "Users";

		const firstChar = title.charAt(0);

		return `${firstChar.toUpperCase()}${title.slice(1)}`;
	};

	return (
		<Head>
			<title className="capitalize">{generateTitle(title.replaceAll("/", ""))} / Twitter</title>
			<meta name="description" content="Created by Dang Van Hien" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/images/twitter-logo.png" />
		</Head>
	);
};
export default Meta;
