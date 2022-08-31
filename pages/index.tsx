import React from "react";
import { Box } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import SearchExercices from "../components/SearchExercices";
import Exercices from "../components/Exercices";

const Home = () => {
	const [toFirstPage, setToFirstPage] = React.useState(false);

	const onSetToFirstPage = (value: boolean) => {
		setToFirstPage(value);
	};

	return (
		<Box>
			<HeroBanner />
			<SearchExercices onSetToFirstPage={onSetToFirstPage} />
			<Exercices setToFirstPage={toFirstPage} onSetToFirstPage={onSetToFirstPage} />
		</Box>
	);
};

export default Home;
