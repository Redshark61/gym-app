import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

const LeftArrow = () => {
	const { scrollPrev } = useContext(VisibilityContext);
	return (
		<Typography onClick={() => scrollPrev()} className="right-arrow">
			<img src={LeftArrowIcon} alt="right-arrow" />
		</Typography>
	);
};

const RightArrow = () => {
	const { scrollNext } = useContext(VisibilityContext);
	return (
		<Typography
			onClick={() => {
				console.log("click");
				scrollNext();
			}}
			className="left-arrow"
		>
			<img src={RightArrowIcon} alt="left-arrow" />
		</Typography>
	);
};

interface Props {
	data: any[];
	component: (props: any) => JSX.Element;
}

const HorizontalScrollBar = ({ data, component }: Props) => {
	return (
		<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
			{data.map((item) => (
				<Box
					component="div"
					key={item.id || item}
					itemID={item.id || item}
					title={item.id || item}
					m="0 40px"
				>
					{component({ children: item })}
				</Box>
			))}
		</ScrollMenu>
	);
};

export default HorizontalScrollBar;
