import React, { useEffect, useState } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { fetchData, exercisesOptions } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, exerciseAction, RootState } from "../store";
import BodyPart from "./BodyPart";
import { Exercise } from "../../@types";

const Exercices = () => {
	const dispatch = useDispatch<AppDispatch>();
	const exercises = useSelector<RootState, Exercise[]>((state) => state.exercices);
	const [search, setSearch] = useState("");
	const [bodyParts, setBodyParts] = useState<string[]>([]);

	useEffect(() => {
		const fetchBodyParts = async () => {
			const URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
			const data = await fetchData<string[]>(URL, exercisesOptions);
			dispatch(exerciseAction.setBodyParts(data));
			setBodyParts(data);
		};

		fetchBodyParts();
	}, [dispatch]);

	const handleSearch = async () => {
		if (search) {
			let exercisesData: Exercise[];
			if (exercises.length === 0) {
				console.log("fetching data");
				const URL = "https://exercisedb.p.rapidapi.com/exercises";
				exercisesData = await fetchData<Exercise[]>(URL, exercisesOptions);
			} else {
				console.log("using cached data");
				exercisesData = exercises;
			}

			const searchedExercices = exercisesData.filter(
				(exercise) =>
					exercise.name.toLowerCase().includes(search.toLowerCase()) ||
					exercise.target.toLowerCase().includes(search.toLowerCase()) ||
					exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
					exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
			);
			console.log(searchedExercices);

			dispatch(exerciseAction.setCurrentExercises(searchedExercices));
			setSearch("");
		}
	};

	return (
		<Stack alignItems={"center"} mt="37px" justifyContent={"center"} p="20px">
			<Typography
				fontWeight={700}
				sx={{ fontSize: { lg: "24px", xs: "13px" } }}
				mb="50px"
				textAlign={"center"}
			>
				Awesome exercises you <br /> should know
			</Typography>
			<Box position="relative" mb="72px">
				<TextField
					sx={{
						input: { fontWeight: "700", border: "none", borderRadius: "4px" },
						width: { lg: "1000px", xs: "350px" },
						backgroundColor: "white",
						borderRadius: "40px",
						height: "76px",
					}}
					value={search}
					onChange={(e) => {
						setSearch(e.target.value.toLowerCase());
					}}
					placeholder="Search Exercices"
					type="text"
				/>
				<Button
					className="search-btn"
					sx={{
						backgroundColor: "#ff2625",
						color: "#fff",
						textTransform: "none",
						width: { lg: "175px", xs: "80px" },
						fontSize: { lg: "20px", xs: "14px" },
						height: "56px",
						position: "absolute",
						right: "0",
					}}
					onClick={handleSearch}
				>
					Search
				</Button>
			</Box>
			<div style={{ position: "relative", width: "100%" }}>
				<HorizontalScrollBar data={bodyParts} component={BodyPart} />
			</div>
		</Stack>
	);
};

export default Exercices;
