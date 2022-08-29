import React, { useState } from "react";
import styles from "./index.module.css";

export function AddingBadge() {
	const [isAdded, setIsAdded] = useState(false);

	const clickHandler = () => {
		setIsAdded(!isAdded);
	};

	return (
		<div className={styles.badge} onClick={clickHandler}>
			{!isAdded ? "➕" : "✅"}
		</div>
	);
}
