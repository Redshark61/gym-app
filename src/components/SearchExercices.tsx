import React, { FormEvent, useEffect, useState } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { fetchData, exercisesOptions } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, exerciseAction, RootState } from "../store";
import BodyPart from "./BodyPart";
import { Exercise } from "../../@types";
import computeSearch from "../utils/computeSearch";

interface Props {
	onSetToFirstPage: (value: boolean) => void;
}

const Exercices = ({ onSetToFirstPage }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const exercises = useSelector<RootState, Exercise[]>((state) => state.exercises.exercices);
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

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (search) {
			let exercisesData: Exercise[];

			if (exercises.length === 0) {
				const URL = "https://exercisedb.p.rapidapi.com/exercises";
				exercisesData = await fetchData<Exercise[]>(URL, exercisesOptions);
				dispatch(exerciseAction.setExercices(exercisesData));
			} else {
				exercisesData = exercises;
			}

			const searchedExercices = computeSearch(search, exercisesData);

			dispatch(exerciseAction.setCurrentExercises(searchedExercices));
			dispatch(exerciseAction.setSearch(search));
			setSearch("");
			onSetToFirstPage(true);
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
			<Box component="form" position="relative" mb="72px" onSubmit={handleSearch}>
				<TextField
					sx={{
						input: { fontWeight: "700", border: "none", borderRadius: "4px" },
						width: { lg: "1000px", xs: "350px" },
						backgroundColor: "white",
					}}
					value={search}
					onChange={(e) => {
						setSearch(e.target.value.toLowerCase());
					}}
					placeholder="Search Exercices"
					type="text"
				/>
				<Button
					type="submit"
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
