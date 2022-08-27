export type Workout = {
  exerciseID: string;
  nbReps: number;
  nbSets: number;
  rest: number;
  weight?: number;
}

export type Workouts = {
  id: string;
  name: string;
  workouts: Workout[];
  restBetweenExercises: number;
}