import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { youtubeOptions, fetchData } from "../utils/fetchData";
import { Box, Typography, Stack } from "@mui/material";
import { RootState } from "../store";
import { Exercise, Video, VideosContent } from "../../@types";
import Loader from "./Loader";

const ExerciseVideo = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { name: exerciseName } = useSelector<RootState, Exercise>(
		(state) => state.selectedExercise
	);

	const youtubeSearchURL = "https://youtube-search-and-download.p.rapidapi.com";
	const [videosDetails, setVideosDetails] = useState<VideosContent[]>([]);

	useEffect(() => {
		(async () => {
			let { contents: exerciseVideoDetail } = await fetchData<Video>(
				`${youtubeSearchURL}/search?query=${exerciseName}`,
				youtubeOptions
			);
			// filter exerciseVideoDetail to get only elements with key 'video' (remove playlists)
			exerciseVideoDetail = exerciseVideoDetail.filter((video) => video.video);
			// sort the videos by the number of views, in order to get the 3 most viewed videos
			exerciseVideoDetail.sort((a, b) => {
				const bViews = parseInt(b.video.viewCountText.replaceAll(",", ""));
				const aViews = parseInt(a.video.viewCountText.replaceAll(",", ""));
				return bViews - aViews;
			});

			setVideosDetails(exerciseVideoDetail);
			setIsLoading(false);
		})();
	}, [youtubeSearchURL, exerciseName]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Box
			sx={{
				marginTop: { lg: "200px", xs: "20px" },
			}}
			p="20px"
		>
			<Typography variant="h4" mb="33px">
				Watch{" "}
				<span style={{ color: "#ff2526", textTransform: "capitalize" }}>
					{exerciseName}
				</span>{" "}
				videos
			</Typography>
			<Stack
				justifyContent="flex-start"
				flexWrap="wrap"
				alignItems="center"
				sx={{
					flexDirection: { lg: "row" },
					gap: { lg: "110px", sx: "0" },
				}}
			>
				{videosDetails.length > 0 &&
					videosDetails.slice(0, 3).map((video, index) => (
						<a
							href={`https://www.youtube.com/watch?v=${video.video.videoId}`}
							key={index}
							className="exercise-video"
							target="_blank"
							rel="noreferrer"
						>
							<img src={video.video.thumbnails[0].url} alt={video.video.title} />
							<Box>
								<Typography variant="h5" color="#000">
									{video.video.title}
								</Typography>
								<Typography variant="h6" color="#000">
									{video.video.channelName}
								</Typography>
							</Box>
						</a>
					))}
			</Stack>
		</Box>
	);
};

export default ExerciseVideo;
