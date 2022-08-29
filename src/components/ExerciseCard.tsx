import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, exerciseAction, RootState, workoutAction } from "../store";
import { Exercise, Workout, Workouts } from "../../@types";
import { AddingBadge } from "./AddingBadge";

interface Props {
	isAdding?: boolean;
	exercise: Exercise;
	children?: Exercise;
}

const ExerciseCard = ({ isAdding = false, exercise, children }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [isAdded, setIsAdded] = useState(false);
	const currentWorkout = useSelector<RootState, Workouts>(
		(state) => state.workouts.currentWorkout
	);

	if (children) {
		exercise = children;
	}

	const navigateHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (!isAdding) {
			navigate(`/exercise/${exercise.id}`);
			dispatch(exerciseAction.setSelectedExercise(exercise));
		} else {
			setIsAdded((prev) => !prev);
			const workout: Workout = {
				exerciseID: exercise.id,
				nbReps: 1,
				nbSets: 1,
				rest: 20,
			};
			dispatch(workoutAction.addAnotherWorkout(workout));
		}
	};

	return (
		<a
			className={isAdding ? "exercise-card-no-hover" : "exercise-card"}
			href={`/exercise/${exercise.id}`}
			onClick={navigateHandler}
		>
			<AddingBadge isAdded={isAdded} />
			<img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
			<Stack direction="row">
				<Button
					sx={{
						ml: "21px",
						color: "#fff",
						background: "#ffa9a9",
						fontSize: "14px",
						borderRadius: "20px",
						textTransform: "capitalize",
					}}
				>
					{exercise.bodyPart}
				</Button>
				<Button
					sx={{
						ml: "21px",
						color: "#fff",
						background: "#fcc797",
						fontSize: "14px",
						borderRadius: "20px",
						textTransform: "capitalize",
					}}
				>
					{exercise.target}
				</Button>
			</Stack>
			<Typography
				ml="21px"
				color="#000"
				fontWeight="bold"
				mt="11px"
				pb="10px"
				textTransform="capitalize"
				fontSize="24px"
			>
				{exercise.name}
			</Typography>
		</a>
	);
};

export default ExerciseCard;
