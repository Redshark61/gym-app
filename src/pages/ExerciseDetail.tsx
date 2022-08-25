import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";
import { exercisesOptions, fetchData } from "../utils/fetchData";
import { AppDispatch, exerciseAction, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Exercise } from "../../@types";
import Loader from "../components/Loader";

const ExerciseDetail = () => {
	const { id } = useParams();
	const [isReady, setIsReady] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const allExercises = useSelector<RootState, Exercise[]>((state) => state.exercices);
	const exerciseLength = allExercises.length;

	useEffect(() => {
		(async () => {
			setIsReady(false);
			if (!exerciseLength) {
				const URL = "https://exercisedb.p.rapidapi.com/exercises";
				const exercisesData = await fetchData<Exercise[]>(URL, exercisesOptions);
				dispatch(exerciseAction.setExercices(exercisesData));
			} else {
				const exercisesData = allExercises;
				const currentExercise = exercisesData.find((exercise) => exercise.id === id);

				if (currentExercise) {
					dispatch(exerciseAction.setSelectedExercise(currentExercise));
					setIsReady(true);
				} else {
					return <div>No exercise found</div>;
				}
			}
		})();
	}, [dispatch, id, allExercises, exerciseLength]);

	return (
		<Box>
			{isReady ? (
				<>
					<Detail />
					<ExerciseVideo />
					<SimilarExercises />
				</>
			) : (
				<Loader />
			)}
		</Box>
	);
};

export default ExerciseDetail;
