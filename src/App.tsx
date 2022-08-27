import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ExerciseDetail from "./pages/ExerciseDetail";
import MyWorkout from "./pages/MyWorkout";
import NewWorkout from "./pages/NewWorkout";

function App() {
	return (
		<BrowserRouter>
			<Box width="400px" sx={{ width: { xl: "1448px" } }} m="auto">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="exercise/:id" element={<ExerciseDetail />} />
					<Route path="my-workout" element={<MyWorkout />} />
					<Route path="my-workout/new" element={<NewWorkout />} />
				</Routes>
				<Footer />
			</Box>
		</BrowserRouter>
	);
}

export default App;
