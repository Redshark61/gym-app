import React, { useState } from "react";
import { Box } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import SearchExercices from "../components/SearchExercices";
import Exercices from "../components/Exercices";

const Home = () => {
	const [bodyPart, setBodyPart] = useState("all");
	const [exercises, setExercices] = useState([]);

	return (
		<Box>
			<HeroBanner />
			<SearchExercices
				exercises={exercises}
				setExercices={setExercices}
				setBodyPart={setBodyPart}
				bodyPart={bodyPart}
			/>
			<Exercices setExercices={setExercices} exercises={exercises} bodyPart={bodyPart} />
		</Box>
	);
};

export default Home;
