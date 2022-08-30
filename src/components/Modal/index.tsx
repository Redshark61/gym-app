import { ReactNode } from "react";
import styles from "./index.module.css";

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
	return (
		<>
			<div className={styles.overlay} onClick={onClose}></div>
			<div className={styles.modal}>
				<div className={styles.cross} onClick={onClose}>
					X
				</div>
				{children}
			</div>
		</>
	);
}
