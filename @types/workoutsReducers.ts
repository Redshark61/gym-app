import { Workouts } from "./workout";

export type WorkoutState = {
  workouts: Workouts[];
  currentWorkout: Workouts;
}