import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, exerciseAction, workoutAction } from "../store";
import { Exercise, Workout } from "../../@types";
import { AddingBadge } from "./AddingBadge";
import { ChooseExerciseDetails } from "./ChooseExerciseDetails";
import { useLocation } from "react-router-dom";

interface Props {
	exercise: Exercise;
	children?: Exercise;
}

const ExerciseCard = ({ exercise, children }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const [isAdded, setIsAdded] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	let isCreating = false;
	console.log(
		'🚀 ~ file: ExerciseCard.tsx ~ line 26 ~ ExerciseCard ~ location.pathname.includes("new")',
		location.pathname.includes("new")
	);

	if (location.pathname.includes("new")) {
		isCreating = true;
	}
	const closeModalHandler = () => {
		setOpenModal(false);
		document.body.style.overflow = "auto";
	};

	const openModalHandler = () => {
		setOpenModal(true);
		document.body.style.overflow = "hidden";
	};

	if (children) {
		exercise = children;
	}

	const navigateHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		console.log("click");

		if (!isCreating) {
			navigate(`/exercise/${exercise.id}`);
			dispatch(exerciseAction.setSelectedExercise(exercise));
		} else {
			openModalHandler();
			console.log("click");
		}
	};

	const addToWorkout = (
		e: FormEvent<HTMLFormElement>,
		reps: number,
		sets: number,
		rest: number
	) => {
		e.preventDefault();
		closeModalHandler();
		setIsAdded((prev) => !prev);
		const workout: Workout = {
			exerciseID: exercise.id,
			nbReps: reps,
			nbSets: sets,
			rest: rest,
		};
		dispatch(workoutAction.addAnotherWorkout(workout));
	};

	return (
		<>
			{openModal && (
				<ChooseExerciseDetails onAdd={addToWorkout} onClose={closeModalHandler} />
			)}
			<a
				className={isCreating ? "exercise-card-no-hover" : "exercise-card"}
				href={`/exercise/${exercise.id}`}
				onClick={navigateHandler}
			>
				{isCreating && <AddingBadge isAdded={isAdded} />}
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
		</>
	);
};

export default ExerciseCard;
