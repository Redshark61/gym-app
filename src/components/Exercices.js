import React, { useEffect, useRef, useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import { exercisesOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercices = ({ setExercices, bodyPart, exercises }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const ref = useRef();
	const exercisesPerPage = 9;
	const indexOfLastExercise = currentPage * exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
	const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

	const paginate = (e, value) => {
		setCurrentPage(value);
		ref.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px" ref={ref}>
			<Typography variant="h4" mb="46px">
				Showing results
			</Typography>
			<Stack
				direction="row"
				sx={{ gap: { xs: "50px" } }}
				flexWrap="wrap"
				justifyContent="center"
			>
				{currentExercises.map((exercise, index) => (
					<ExerciseCard key={index}>{exercise}</ExerciseCard>
				))}
			</Stack>
			<Stack mt="100px" alignItems="center">
				{exercises.length > exercisesPerPage && (
					<Pagination
						color="standard"
						shape="rounded"
						defaultPage={1}
						count={Math.ceil(exercises.length / exercisesPerPage)}
						page={currentPage}
						onChange={paginate}
						size="large"
					/>
				)}
			</Stack>
		</Box>
	);
};

export default Exercices;
