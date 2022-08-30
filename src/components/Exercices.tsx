import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Pagination, Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, exerciseAction, RootState } from "../store";
import { exercisesOptions, fetchData } from "../utils/fetchData";
import { Exercise } from "../../@types";
import { cacheData } from "../utils/cacheExercises";

interface Props {
	setToFirstPage?: boolean;
	onSetToFirstPage: (value: boolean) => void;
}

const Exercices = ({ setToFirstPage = false, onSetToFirstPage }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const exercises = useSelector<RootState, Exercise[]>((state) => state.exercises.exercices);
	let selectedExercises = useSelector<RootState, Exercise[]>(
		(state) => state.exercises.currentExercises
	);
	const search = useSelector<RootState, string>((state) => state.exercises.search);
	const bodyPart = useSelector<RootState, string>((state) => state.exercises.bodyPart);
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
			let exercisesData: Exercise[] = await cacheData(exercises, dispatch);

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
				Showing results {search ? "for: " + search : ""}
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
