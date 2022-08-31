import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import store from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Box width="400px" sx={{ width: { xl: "1448px" } }} m="auto">
				<Navbar />
				<Component {...pageProps} />
				<Footer />
			</Box>
		</Provider>
	);
}

export default MyApp;
