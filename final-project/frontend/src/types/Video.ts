export type Video = {
  id: number;
  title: string;
  thumbnailURL: string;
  videoURL: string;
};

export type GetVideosAPI = {
  msg: string;
  data: Video[];
};

export type GetVideoByIDAPI = {
  msg: string;
  data: Video;
};
