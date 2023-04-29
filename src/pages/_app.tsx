import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { RootLayout, MainContentLayout } from "@src/components/layouts";

import "@src/styles/globals.css";

const App: NextPage<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<RootLayout session={session}>
			<MainContentLayout>
				<Component {...pageProps} />
			</MainContentLayout>
		</RootLayout>
	);
};

export default App;
