import { configureStore } from "@reduxjs/toolkit";
import { exerciseSlice } from "../reducers/exercises";

const store = configureStore({
  reducer: {
    exercises: exerciseSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const exerciseAction = exerciseSlice.actions;
export default store;
