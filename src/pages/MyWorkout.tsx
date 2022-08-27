import React from "react";
import { useSelector } from "react-redux";
import { Workouts } from "../../@types";
import { RootState } from "../store";

const MyWorkout = () => {
	const workout = useSelector<RootState, Workouts[]>((state) => state.workouts.workouts);

	return (
		<div>
			<h1>My Workout</h1>
			{workout.length ? (
				<ul>
					{workout.map((workout) => (
						<li key={workout.id}>{workout.name}</li>
					))}
				</ul>
			) : (
				<h2>No workouts yet!</h2>
			)}
		</div>
	);
};

export default MyWorkout;
