import { createSlice } from "@reduxjs/toolkit";
import { Workouts, WorkoutState } from "../../@types";


const initialState: WorkoutState = {
  workouts: [],
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout: (state, action: { payload: Workouts }) => {
      state.workouts.push(action.payload);
    }
  },
});