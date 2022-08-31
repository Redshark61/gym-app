import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HeroBannerImage from "../assets/images/banner.png";
import Image from "next/image";

const HeroBanner = () => {
	return (
		<Box
			component="div"
			sx={{
				marginTop: { lg: "212px", xs: "70px" },
				marginLeft: { sm: "50px" },
			}}
			position="relative"
			p="20px"
		>
			<Typography color="#ff2625" fontWeight={"600"} fontSize={"26px"}>
				Fitness Club
			</Typography>
			<Typography
				fontWeight="700"
				sx={{
					fontSize: {
						lg: "44px",
						xs: "40px",
					},
				}}
				lineHeight={1}
				mb="23px"
				mt="30px"
			>
				Sweat, smile <br /> and reapeat
			</Typography>
			<Typography fontSize="22px" lineHeight={2} mb={4}>
				Check out our new collection of exercises
			</Typography>
			<Button
				variant="contained"
				color="error"
				sx={{ backgroundColor: "#ff2625", padding: "10px" }}
			>
				Explore Exercices
			</Button>
			<Typography
				fontWeight={600}
				color="#ff2625"
				sx={{
					opacity: 0.1,
					display: { lg: "block", xs: "none" },
				}}
				fontSize="200px"
			>
				Exercise
			</Typography>
			<div className="hero-banner-img">
				<Image src={HeroBannerImage} alt="banner" layout="fill" />
			</div>
		</Box>
	);
};

export default HeroBanner;
