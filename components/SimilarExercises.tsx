import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollBar from "./HorizontalScrollBar";
import Loader from "./Loader";
import ExerciseCard from "./ExerciseCard";
import { RootState } from "../store";
import { Exercise } from "../@types";

const SimilarExercises = () => {
	const selectedExercise = useSelector<RootState, Exercise>(
		(state) => state.exercises.selectedExercise
	);
	const allExercises = useSelector<RootState, Exercise[]>((state) => state.exercises.exercices);
	const [similarTarget, setSimilarTarget] = useState<Exercise[]>([]);
	const [similarEquipment, setSimilarEquipment] = useState<Exercise[]>([]);

	useEffect(() => {
		const { target, equipment } = selectedExercise;
		const similarTarget = allExercises.filter((exercise) => exercise.target === target);

		const similarEquipment = allExercises.filter(
			(exercise) => exercise.equipment === equipment
		);
		setSimilarTarget(similarTarget);
		setSimilarEquipment(similarEquipment);
	}, [selectedExercise, allExercises]);

	return (
		<Box sx={{ mt: { lg: "100px", xs: "0" } }}>
			<Typography variant="h4" mb={5}>
				Exercises that target the same muscle group
			</Typography>
			<Stack direction="row" sx={{ p: "2px", position: "relative" }}>
				{similarTarget.length ? (
					<HorizontalScrollBar data={similarTarget} component={ExerciseCard} />
				) : (
					<Loader />
				)}
			</Stack>

			<Typography variant="h4" mb={5}>
				Exercises that use the same equipment
			</Typography>
			<Stack direction="row" sx={{ p: "2px", position: "relative" }}>
				{similarEquipment.length ? (
					<HorizontalScrollBar data={similarEquipment} component={ExerciseCard} />
				) : (
					<Loader />
				)}
			</Stack>
		</Box>
	);
};

export default SimilarExercises;
