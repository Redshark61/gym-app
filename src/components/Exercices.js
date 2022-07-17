import React, { useEffect, useRef, useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import { useDispatch, useSelector } from "react-redux";
import { exerciseAction } from "../store";
import { exercisesOptions, fetchData } from "../utils/fetchData";

const Exercices = () => {
	const dispatch = useDispatch();
	const exercises = useSelector(state => state.exercices);
	let selectedExercises = useSelector(state => state.currentExercises);
	const bodyPart = useSelector(state => state.bodyPart);
	const [currentPage, setCurrentPage] = useState(1);
	const ref = useRef();
	const exercisesPerPage = 9;
	const indexOfLastExercise = currentPage * exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

	useEffect(() => {
		(async (selectedExercises) => {
			let exercisesData;
			if (exercises.length === 0) {
				const URL = "https://exercisedb.p.rapidapi.com/exercises";
				exercisesData = await fetchData(URL, exercisesOptions);
				dispatch(exerciseAction.setExercices(exercisesData));
				console.log("exercises set")
			} else {
				exercisesData = exercises;
			}

			if (bodyPart !== "all") {
				selectedExercises = exercisesData.filter(
					(exercise) => exercise.bodyPart === bodyPart
				);

				dispatch(exerciseAction.setCurrentExercises(selectedExercises));
			} else {
				dispatch(exerciseAction.setCurrentExercises(exercisesData));
			}

		})()
	}, [bodyPart, dispatch, exercises]);



	const currentExercises = selectedExercises.slice(indexOfFirstExercise, indexOfLastExercise);

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
				{selectedExercises.length > exercisesPerPage && (
					<Pagination
						color="standard"
						shape="rounded"
						defaultPage={1}
						count={Math.ceil(selectedExercises.length / exercisesPerPage)}
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
