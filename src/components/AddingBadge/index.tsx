import React from "react";
import styles from "./index.module.css";

interface Props {
	isAdded: boolean;
}

export function AddingBadge({ isAdded }: Props) {
	console.log("in badge");

	return <div className={styles.badge}>{!isAdded ? "➕" : "✅"}</div>;
}
