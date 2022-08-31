import React, { ReactNode } from "react";
// import { VisibilityContext } from "react-horizontal-scrolling-menu";

interface Props {
	children: React.FunctionComponentElement<any> | ReactNode;
	itemID: string;
}

const ScrollingCard = ({ children, itemID }: Props) => {
	// const visibility = React.useContext(VisibilityContext);

	// const visible = visibility.isItemVisible(itemID);

	return (
		<div
			style={{
				margin: "0 10px",
				userSelect: "none",
			}}
		>
			<div>{children}</div>
		</div>
	);
};

export default ScrollingCard;
