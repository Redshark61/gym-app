import { configureStore } from "@reduxjs/toolkit";
import { exerciseSlice } from "../reducers/exercises";
import { workoutSlice } from "../reducers/workout";

const store = configureStore({
  reducer: {
    exercises: exerciseSlice.reducer,
    workouts: workoutSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const exerciseAction = exerciseSlice.actions;
export const workoutAction = workoutSlice.actions;
export default store;
