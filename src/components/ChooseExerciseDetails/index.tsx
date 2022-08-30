import React, { FormEvent } from "react";
import { Modal } from "../Modal";
import styles from "./index.module.css";

interface Props {
	onAdd: (e: FormEvent<HTMLFormElement>, reps: number, sets: number, rest: number) => void;
	onClose: () => void;
}

export function ChooseExerciseDetails({ onAdd, onClose }: Props) {
	const [reps, setReps] = React.useState(0);
	const [sets, setSets] = React.useState(0);
	const [rest, setRest] = React.useState(0);

	return (
		<Modal onClose={onClose}>
			<form className={styles.form} action="" onSubmit={(e) => onAdd(e, reps, sets, rest)}>
				<div className={styles.form__group}>
					<label htmlFor="sets">Sets</label>
					<input
						type="text"
						name="sets"
						id="sets"
						placeholder="Number of sets"
						defaultValue={sets}
						onChange={(e) => setSets(Number(e.target.value))}
					/>
				</div>
				<div className={styles.form__group}>
					<label htmlFor="reps">Reps</label>
					<input
						type="text"
						name="reps"
						id="reps"
						placeholder="Number of reps"
						defaultValue={reps}
						onChange={(e) => setReps(Number(e.target.value))}
					/>
				</div>
				<div className={styles.form__group}>
					<label htmlFor="weight">Weight</label>
					<input
						type="text"
						name="weight"
						id="weight"
						placeholder="Weight"
						defaultValue={10}
					/>
				</div>
				<div className={styles.form__group}>
					<label htmlFor="rest">Rest</label>
					<input
						type="text"
						name="rest"
						id="rest"
						placeholder="Rest time between each sets"
						defaultValue={rest}
						onChange={(e) => setRest(Number(e.target.value))}
					/>
				</div>
				<button type="submit">Validate</button>
			</form>
		</Modal>
	);
}
