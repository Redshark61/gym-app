import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import { useDispatch, useSelector } from "react-redux";
import { exerciseAction, RootState } from "../store";
import { exercisesOptions, fetchData } from "../utils/fetchData";
import { Exercise } from "../../@types";
import { on } from "process";

interface Props {
	setToFirstPage?: boolean;
	onSetToFirstPage: (value: boolean) => void;
}

const Exercices = ({ setToFirstPage = false, onSetToFirstPage }: Props) => {
	const dispatch = useDispatch();
	const exercises = useSelector<RootState, Exercise[]>((state) => state.exercices);
	let selectedExercises = useSelector<RootState, Exercise[]>((state) => state.currentExercises);
	const bodyPart = useSelector<RootState, string>((state) => state.bodyPart);
	const [currentPage, setCurrentPage] = useState(1);

	const resultsRef = useRef<HTMLDivElement>(null);
	const exercisesPerPage = 9;
	const indexOfLastExercise = currentPage * exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

	useEffect(() => {
		if (setToFirstPage) {
			setCurrentPage(1);
			onSetToFirstPage(false);
		}
	}, [setToFirstPage, onSetToFirstPage]);

	useEffect(() => {
		(async () => {
			let exercisesData: Exercise[];
			if (exercises.length === 0) {
				const URL = "https://exercisedb.p.rapidapi.com/exercises";
				exercisesData = await fetchData(URL, exercisesOptions);
				dispatch(exerciseAction.setExercices(exercisesData));
			} else {
				exercisesData = exercises;
			}

			if (bodyPart !== "all") {
				let selectedExercises = exercisesData.filter(
					(exercise) => exercise.bodyPart === bodyPart
				);
				dispatch(exerciseAction.setCurrentExercises(selectedExercises));
			} else {
				dispatch(exerciseAction.setCurrentExercises(exercisesData));
			}
		})();
	}, [bodyPart, dispatch, exercises]);

	const currentExercises = selectedExercises.slice(indexOfFirstExercise, indexOfLastExercise);

	const paginate = (e: ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		if (resultsRef.current) {
			resultsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px" ref={resultsRef}>
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
					<ExerciseCard key={index} exercise={exercise} />
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
