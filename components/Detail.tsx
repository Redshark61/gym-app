import React from "react";
import { useSelector } from "react-redux";
import { Typography, Stack, Button } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { RootState } from "../store";
import { Exercise } from "../@types";
import Image from "next/image";

const Detail = () => {
	let { bodyPart, gifUrl, name, target, equipment } = useSelector<RootState, Exercise>(
		(state) => state.exercises.selectedExercise
	);

	const extraDetail = [
		{
			icon: BodyPartImage,
			text: bodyPart,
		},
		{
			icon: TargetImage,
			text: target,
		},
		{
			icon: EquipmentImage,
			text: equipment,
		},
	];

	return (
		<Stack gap="60px" sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}>
			<img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
			<Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
				<Typography variant="h3">{name}</Typography>
				<Typography variant="h6">
					Exercises keep your body in an athletic posture. {name} is one of the best
					exercises to target your {target}.
				</Typography>
				{extraDetail.map(({ icon, text }) => (
					<Stack key={text} direction="row" gap="24px" alignItems="center">
						<Button
							sx={{
								backgroundColor: "#fff2db",
								borderRadius: "50%",
								width: "100px",
								height: "100px",
							}}
						>
							<Image
								src={icon}
								alt={text}
								style={{
									width: "50px",
									height: "50px",
								}}
							/>
						</Button>
						<Typography variant="h5" sx={{ textTransform: "capitalize" }}>
							{text}
						</Typography>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};

export default Detail;
