import React from "react";
import { Stack } from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import Image from "next/image";
import styles from "./index.module.css";
import { NavLink } from "../NavLink";

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
			<NavLink href="/" exact className={styles["link"]}>
				<Image
					src={Logo}
					alt="logo"
					style={{ width: "48px", height: "48px", margin: "0 20px" }}
				/>
			</NavLink>
			<Stack direction={"row"} gap="40px" fontSize="24px" alignItems={"flex-end"}>
				<NavLink href="/" exact className={styles["link"]}>
					Home
				</NavLink>
				<NavLink end href="/my-workout" className={styles["link"]}>
					My Workout
				</NavLink>
				<NavLink end href="/my-workout/new" className={styles["link"]}>
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
