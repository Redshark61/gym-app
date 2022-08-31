import { Exercise } from "../@types";
import { AppDispatch, exerciseAction } from "../store";
import { exercisesOptions, fetchData } from "./fetchData";
import type { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";

type Thunk = ThunkDispatch<AppDispatch, undefined, AnyAction> & Dispatch<AnyAction>;

export async function cacheData(exercises: Exercise[], dispatch: Thunk) {

  let exercisesData: Exercise[];
  if (exercises.length === 0) {
    const URL = "https://exercisedb.p.rapidapi.com/exercises";
    exercisesData = await fetchData(URL, exercisesOptions);
    dispatch(exerciseAction.setExercices(exercisesData));
  } else {
    exercisesData = exercises;
  }

  return exercisesData;
}