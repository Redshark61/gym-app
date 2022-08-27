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
