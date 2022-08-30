import React, { FormEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Workouts } from "../../@types";
import Exercises from "../components/Exercices";
import SearchExercises from "../components/SearchExercices";
import { AppDispatch, RootState, workoutAction } from "../store";

const NewWorkout = () => {
	const [isCreating, setIsCreating] = useState(false);
	const [toFirstPage, setToFirstPage] = React.useState(false);
	const nameRef = React.useRef<HTMLInputElement>(null);
	const restTimeRef = React.useRef<HTMLInputElement>(null);
	const dispatch = useDispatch<AppDispatch>();
	const currentWorkout = useSelector<RootState, Workouts>(
		(state) => state.workouts.currentWorkout
	);

	const onSetToFirstPage = (value: boolean) => {
		setToFirstPage(value);
	};

	const handleSave = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(workoutAction.addWorkout(currentWorkout));
	};

	const sumbitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// random id
		if (nameRef.current && restTimeRef.current) {
			const id = Math.floor(Math.random() * 1000000).toString();
			const workout: Workouts = {
				id,
				name: nameRef.current?.value,
				workouts: [],
				restBetweenExercises: parseInt(restTimeRef.current?.value),
			};
			dispatch(workoutAction.newCurrentWorkout(workout));
			setIsCreating(true);
		}
	};

	return (
		<>
			<h1>New Workout</h1>
			<form action="" onSubmit={sumbitHandler}>
				<input type="text" placeholder="Workout Name" ref={nameRef} />
				<input
					type="number"
					placeholder="Rest between each exercises (in second)"
					ref={restTimeRef}
				/>
				<button type="submit">Next</button>
			</form>

			{isCreating && (
				<>
					<button onClick={handleSave}>Save the workout</button>
					<SearchExercises onSetToFirstPage={onSetToFirstPage} />
					<Exercises setToFirstPage={toFirstPage} onSetToFirstPage={onSetToFirstPage} />
				</>
			)}
		</>
	);
};

export default NewWorkout;
