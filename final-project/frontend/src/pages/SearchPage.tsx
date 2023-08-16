import React, { SyntheticEvent, useState } from "react";
import SearchBar from "../components/SearchPage/SearchBar";
import { GetVideosAPI, Video } from "../types/Video";
import axios from "axios";
import { BASE_URL } from "../config";
import VideoCard from "../components/MainPage/VideoCard";

const SearchPage = () => {
  const [videos, setVideos] = useState<Video[]>();
  const [querySearch, setQuerySearch] = useState<string>("");

  const searchVideos = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .get<GetVideosAPI>(`${BASE_URL}/videos?query=${querySearch}`)
      .then((value) => {
        setVideos(value.data.data);
      });
  };

  return (
    <>
      <div className="pr-10">
        <SearchBar onSearch={searchVideos} setQuerySearch={setQuerySearch} />
      </div>

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

export default SearchPage;
