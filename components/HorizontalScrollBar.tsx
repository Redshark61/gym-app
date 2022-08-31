import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import ScrollingCard from "./ScrollingCard";
import Image from "next/image";

const LeftArrow = () => {
	const { scrollPrev } = useContext(VisibilityContext);
	return (
		<Typography onClick={() => scrollPrev()} className="right-arrow">
			<Image src={LeftArrowIcon} alt="right-arrow" style={{ pointerEvents: "none" }} />
		</Typography>
	);
};

const RightArrow = () => {
	const { scrollNext } = useContext(VisibilityContext);
	return (
		<Typography
			onClick={() => {
				scrollNext();
			}}
			className="left-arrow"
		>
			<Image src={RightArrowIcon} alt="left-arrow" style={{ pointerEvents: "none" }} />
		</Typography>
	);
};

interface Props {
	data: any[];
	component: (props: any) => JSX.Element;
	onSetToFirstPage?: (value: boolean) => void;
}

const HorizontalScrollBar = ({ onSetToFirstPage = undefined, data, component }: Props) => {
	return (
		<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
			{data.map((item) => (
				<ScrollingCard key={item.id || item} itemID={item.id || item}>
					{React.createElement(
						component,
						onSetToFirstPage ? { onSetToFirstPage } : {},
						item
					)}
				</ScrollingCard>
			))}
		</ScrollMenu>
	);
};

export default HorizontalScrollBar;
