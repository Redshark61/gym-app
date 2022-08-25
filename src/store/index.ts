import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { Exercise, InitialState } from "../../@types";

const initialState: InitialState = {
  bodyPart: "all",
  bodyParts: [],
  exercices: [],
  currentExercises: [],
  selectedExercise: {} as Exercise,
};

const exerciseSlice = createSlice({
  name: "counter",
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
    }
  },
});

const store = configureStore({
  reducer: exerciseSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const exerciseAction = exerciseSlice.actions;
export default store;
