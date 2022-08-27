import { createSlice } from "@reduxjs/toolkit";
import { Exercise, ExerciseState, } from "../../@types";


const initialState: ExerciseState = {
  bodyPart: "all",
  bodyParts: [],
  exercices: [],
  currentExercises: [],
  selectedExercise: {} as Exercise,
  search: "",
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setBodyParts(state, action: { payload: string[] }) {
      state.bodyParts = ["all", ...action.payload];
    },
    setExercices(state, action: { payload: Exercise[] }) {
      state.exercices = action.payload;
    },
    setBodyPart(state, action: { payload: string }) {
      state.bodyPart = action.payload;
    },
    setCurrentExercises(state, action: { payload: Exercise[] }) {
      state.currentExercises = action.payload;
    },
    setSelectedExercise(state, action: { payload: Exercise }) {
      state.selectedExercise = action.payload;
    },
    setSearch(state, action: { payload: string }) {
      state.search = action.payload;
    }
  },
});