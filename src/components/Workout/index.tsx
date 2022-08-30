import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Exercise, Workout, Workouts } from "../../../@types";
import { RootState } from "../../store";

interface WorkoutProps {
	workout: Workouts;
}

export function WorkoutItem({ workout }: WorkoutProps) {
	const [isOpened, setIsOpened] = useState(false);
	const exercises = useSelector<RootState, Exercise[]>((state) => state.exercises.exercices);

	const seeMore = () => {
		setIsOpened((prev) => !prev);
	};

	const workoutCreator = (exercise: Workout) => {
		const { exerciseID: id } = exercise;
		const workout = exercises.find((exercise) => exercise.id === id);

		if (workout) {
			return (
				<div>
					<h2>
						{exercise.nbSets} * {exercise.nbReps}
					</h2>
					<p>{workout.name}</p>
					<p>{workout.equipment}</p>
					<p>{workout.target}</p>
				</div>
			);
		}
	};

	return (
		<li key={workout.id}>
			{workout.name} <span onClick={seeMore}>{!isOpened ? "⬇️" : "⬆️"}</span>
			{isOpened && <ul>{workout.workouts.map(workoutCreator)}</ul>}
		</li>
	);
}
