import React, { Fragment } from "react";
import type { NextPage } from "next";

import { Header } from "@src/components/user";
import { Loader } from "@src/components/ui";

import { useUser } from "@src/hooks";
import { CreateNewPost } from "@src/components/posts";

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
	const { isLoading } = useUser();

	return (
		<div className="w-full h-full">
			<Header label="Home" />
			<Fragment>
				{isLoading ? <Loader size={60} /> : <CreateNewPost placeholder="What's happening?" />}
			</Fragment>
		</div>
	);
};
export default Home;
