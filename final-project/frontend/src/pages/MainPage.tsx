import React, { useEffect, useState } from "react";
import VideoCard from "../components/MainPage/VideoCard";
import { GetVideosAPI, Video } from "../types/Video";
import axios from "axios";
import { BASE_URL } from "../config";

const MainPage = () => {
  const [videos, setVideos] = useState<Video[]>();

  const getVideos = () => {
    axios.get<GetVideosAPI>(`${BASE_URL}/videos`).then((value) => {
      setVideos(value.data.data);
    });
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4 py-5">
        {videos &&
          videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnailURL={video.thumbnailURL}
            />
          ))}
      </div>
    </>
  );
};

export default MainPage;
