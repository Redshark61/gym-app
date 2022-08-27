import { Exercise } from "../../@types";

const computeSearch = (search: string, exercises: Exercise[]): Exercise[] => {
	const searchElements = search.split(" ");

	for (const searchElement of searchElements) {
		const result = exercises.filter(
			(exercise) =>
				exercise.name.toLowerCase().includes(searchElement.toLowerCase()) ||
				exercise.target.toLowerCase().includes(searchElement.toLowerCase()) ||
				exercise.equipment.toLowerCase().includes(searchElement.toLowerCase()) ||
				exercise.bodyPart.toLowerCase().includes(searchElement.toLowerCase())
		);
		exercises = result;
	}

	return exercises;
};

export default computeSearch;
