import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  bodyPart: "all",
  bodyParts: [],
  exercices: [],
  currentExercises: [],
};

const exerciseSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setBodyParts(state, action) {
      state.bodyParts = ["all", ...action.payload];
    },
    setExercices(state, action) {
      state.exercices = action.payload;
    },
    setBodyPart(state, action) {
      state.bodyPart = action.payload;
    },
    setCurrentExercises(state, action) {
      state.currentExercises = action.payload;
    }
  },
});

const store = configureStore({
  reducer: exerciseSlice.reducer,
});

export const exerciseAction = exerciseSlice.actions;
export default store;
