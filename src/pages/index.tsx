import React, { Fragment } from "react";
import type { NextPage } from "next";

import { Header } from "@src/components/user";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
	return (
		<Fragment>
			<Header label="Home" />
		</Fragment>
	);
};
export default Home;
