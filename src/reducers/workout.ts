import { createSlice } from "@reduxjs/toolkit";
import { Workouts, Workout, WorkoutState } from "../../@types";


const initialState: WorkoutState = {
  workouts: [],
  currentWorkout: {} as Workouts,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout: (state, action: { payload: Workouts }) => {
      state.workouts.push(action.payload);
    },
    newCurrentWorkout: (state, action: { payload: Workouts }) => {
      state.currentWorkout = action.payload;
    },
    addAnotherWorkout: (state, action: { payload: Workout }) => {
      state.currentWorkout.workouts.push(action.payload);
    }
  },
});