import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../assets/icons/gym.png";
import { useSelector, useDispatch } from "react-redux";
import { exerciseAction, RootState } from "../store";

interface Props {
	children: string;
}

const BodyPart = ({ children: item }: Props) => {
	const dispatch = useDispatch();
	const bodyPart = useSelector<RootState>((state) => state.exercises.bodyPart);

	return (
		<Stack
			component="button"
			alignItems="center"
			justifyContent="center"
			className="bodyPart-card"
			sx={{
				backgroundColor: "#fff",
				borderBottomLeftRadius: "20px",
				width: "170px",
				height: "180px",
				cursor: "pointer",
				gap: "47px",
				border: "none",
				borderTop: bodyPart === item ? "2px solid #ff2625" : "none",
			}}
			onClick={() => {
				dispatch(exerciseAction.setBodyPart(item));
				window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
			}}
		>
			<img src={Icon} alt="thumbnail" style={{ width: "30px", height: "30px" }} />
			<Typography
				fontSize="20px"
				fontWeight="bold"
				color="#3a1212"
				textTransform="capitalize"
			>
				{item}
			</Typography>
		</Stack>
	);
};

export default BodyPart;
