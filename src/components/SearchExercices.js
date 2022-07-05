import React, { useEffect, useState } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { fetchData, exercisesOptions } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const Exercices = ({ exercises, setExercices, bodyPart, setBodyPart }) => {
	const [search, setSearch] = useState("");
	const [bodyParts, setBodyParts] = useState([]);

	useEffect(() => {
		const fetchBodyParts = async () => {
			const URL = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
			const bodyParts = await fetchData(URL, exercisesOptions);
			setBodyParts(["all", ...bodyParts]);
		};

		fetchBodyParts();
	}, []);

	const handleSearch = async () => {
		if (search) {
			let exercisesData;
			if (exercises.length === 0) {
				const URL = "https://exercisedb.p.rapidapi.com/exercises";
				exercisesData = await fetchData(URL, exercisesOptions);
			} else {
				exercisesData = exercises;
			}
			// console.log(exercisesData);
			const searchedExercices = exercisesData.filter(
				(exercise) =>
					exercise.name.toLowerCase().includes(search.toLowerCase()) ||
					exercise.target.toLowerCase().includes(search.toLowerCase()) ||
					exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
					exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
			);

			setExercices(searchedExercices);
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
					}}
					height="76px"
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
			<Box sx={{ position: "relative", width: "100%", p: "20px" }}>
				<HorizontalScrollBar
					data={bodyParts}
					bodyPart={bodyPart}
					setBodyPart={setBodyPart}
				/>
			</Box>
		</Stack>
	);
};

export default Exercices;
