export type Workout = {
  exerciseID: string;
  nbReps: number;
  nbSets: number;
  rest: number;
}

export type Workouts = {
  id: string;
  name: string;
  workouts: Workout[];
  restBetweenExercises: number;
}