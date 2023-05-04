import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { RootLayout, MainContentLayout } from "@src/components/layouts";

import "nprogress/nprogress.css";
import "@src/styles/globals.css";

const App: NextPage<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
	const router = useRouter();

	// display progress bars when changing routes
	useEffect(() => {
		const handleStart = () => NProgress.start();
		const handleComplete = () => NProgress.done();

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<RootLayout session={session}>
			<MainContentLayout>
				<Component {...pageProps} />
			</MainContentLayout>
		</RootLayout>
	);
};

export default App;
