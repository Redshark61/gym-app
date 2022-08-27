import { Exercise } from ".";


export type InitialState = {
  bodyPart: string;
  bodyParts: string[];
  exercices: Exercise[];
  currentExercises: Exercise[];
  selectedExercise: Exercise;
  search: string;
}