import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { exerciseAction } from "../store";

const ExerciseCard = ({ children: exercise }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const navigateHandler = (e) => {
		e.preventDefault();
		dispatch(exerciseAction.setSelectedExercise(exercise));
		navigate(`/exercise/${exercise.id}`);
	}

	return (
		<a className="exercise-card" href={`/exercise/${exercise.id}`} onClick={navigateHandler}>
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
