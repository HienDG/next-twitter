import React from "react";
import type { NextPage } from "next";

import { Header } from "@src/components/user";
import { Tweet, PostFeed } from "@src/components/posts";



const Home: NextPage = () => {
	return (
		<div className="relative w-full h-full">
			<Header label="Home" />
			<Tweet />
			<PostFeed />
		</div>
	);
};
export default Home;
