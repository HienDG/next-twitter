import React from "react";
import type { NextPage } from "next";

import { Header } from "@src/components/user";
import { Tweet } from "@src/components/posts";

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
	return (
		<div className="w-full h-full">
			<Header label="Home" />
			<Tweet />
		</div>
	);
};
export default Home;
