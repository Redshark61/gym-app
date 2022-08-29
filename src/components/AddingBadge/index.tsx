import React, { useState } from "react";
import styles from "./index.module.css";

interface Props {
	isAdded: boolean;
}

export function AddingBadge({ isAdded }: Props) {
	return <div className={styles.badge}>{!isAdded ? "➕" : "✅"}</div>;
}
