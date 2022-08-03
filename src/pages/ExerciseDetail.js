import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";
import { exercisesOptions, fetchData } from "../utils/fetchData";

const ExerciseDetail = () => {
	return (
		<Box>
			<Detail />
			<ExerciseVideo />
			<SimilarExercises />
		</Box>);
};

export default ExerciseDetail;
