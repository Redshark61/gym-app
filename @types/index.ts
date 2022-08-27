export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

export type InitialState = {
  bodyPart: string;
  bodyParts: string[];
  exercices: Exercise[];
  currentExercises: Exercise[];
  selectedExercise: Exercise;
  search: string;
}

export type Thumbnail = {
  height: number;
  url: string;
  width: number;
}

export type VideoContent = {
  "channelId": string;
  "channelName": string;
  "description": string;
  "lengthText": string;
  "publishedTimeText": string;
  "thumbnails": Thumbnail[];
  "title": string;
  "videoId": string;
  "viewCountText": string;
}

export type VideosContent = {
  video: VideoContent;
}

export type Video = {
  contents: VideosContent[];
  estimatedResult: string;
  next: string;
}
