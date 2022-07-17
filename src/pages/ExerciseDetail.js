import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";
import { exercisesOptions, fetchData } from "../utils/fetchData"
import { exerciseAction } from '../store'
import { useDispatch, useSelector } from "react-redux";

const ExerciseDetail = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const selectedExercise = useSelector(state => state.selectedExercise)
	const exerciseLength = Object.keys(selectedExercise).length

	if (!exerciseLength) {
		(async () => {
			const URL = "https://exercisedb.p.rapidapi.com/exercises";
			const exercisesData = await fetchData(URL, exercisesOptions);
			dispatch(exerciseAction.setExercices(exercisesData));

			const currentExercise = exercisesData.find(exercise => exercise.id === id)
			dispatch(exerciseAction.setSelectedExercise(currentExercise))
		})()
	}

	return (
		<Box>
			<Detail />
			<ExerciseVideo />
			<SimilarExercises />
		</Box>);
};

export default ExerciseDetail;
