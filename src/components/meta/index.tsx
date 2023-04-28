import React from "react";
import Head from "next/head";

const Meta: React.FC = () => {
	return (
		<Head>
			<title className="capitalize">Twitter</title>
			<meta name="description" content="Created by Dang Van Hien" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/images/twitter-logo.png" />
		</Head>
	);
};
export default Meta;
