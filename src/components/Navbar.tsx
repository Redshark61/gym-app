import React from "react";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
	return (
		<Stack
			direction={"row"}
			justifyContent={"space-around"}
			sx={{
				gap: { sm: "122px", xs: "40px" },
				mt: { sm: "32px", xs: "20px" },
				justifyContent: "none",
			}}
			px={"20px"}
		>
			<NavLink to="/">
				<img
					src={Logo}
					alt="logo"
					style={{ width: "48px", height: "48px", margin: "0 20px" }}
				/>
			</NavLink>
			<Stack direction={"row"} gap="40px" fontSize="24px" alignItems={"flex-end"}>
				<NavLink
					to="/"
					style={({ isActive }) => ({
						textDecoration: "none",
						borderBottom: isActive ? "2px solid #ff2526" : "none",
						color: "#3a1212",
					})}
				>
					Home
				</NavLink>
				<NavLink
					end
					to="/my-workout"
					style={({ isActive }) => ({
						textDecoration: "none",
						borderBottom: isActive ? "2px solid #ff2526" : "none",
						color: "#3a1212",
					})}
				>
					My Workout
				</NavLink>
				<NavLink
					to="/my-workout/new"
					style={({ isActive }) => ({
						textDecoration: "none",
						borderBottom: isActive ? "2px solid #ff2526" : "none",
						color: "#3a1212",
					})}
				>
					New Workout
				</NavLink>
				<a href="#exercises" style={{ textDecoration: "none", color: "#3a1212" }}>
					Exercices
				</a>
			</Stack>
		</Stack>
	);
};

export default Navbar;
