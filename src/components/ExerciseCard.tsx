import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, exerciseAction } from "../store";
import { Exercise } from "../../@types";
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

	if (children) {
		exercise = children;
	}

	const navigateHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		dispatch(exerciseAction.setSelectedExercise(exercise));
		if (!isAdding) {
			navigate(`/exercise/${exercise.id}`);
		}
	};

	return (
		<a
			className={isAdding ? "exercise-card-no-hover" : "exercise-card"}
			href={`/exercise/${exercise.id}`}
			onClick={navigateHandler}
		>
			<AddingBadge />
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
