import { Exercise } from ".";


export type ExerciseState = {
  bodyPart: string;
  bodyParts: string[];
  exercices: Exercise[];
  currentExercises: Exercise[];
  selectedExercise: Exercise;
  search: string;
}