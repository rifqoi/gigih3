import React from "react";

type VideoContainerType = {
  title: string;
  videoURL: string;
};

const VideoContainer: React.FC<VideoContainerType> = ({ title, videoURL }) => {
  return (
    <>
      <div className=" mr-4 flex h-[450px] flex-col items-center">
        <iframe
          width="100%"
          height="450"
          src={videoURL}
          title="Youtube Player"
          className="rounded-xl"
          allowFullScreen
        />
      </div>
      <h2 className="my-4 self-start rounded-b-sm text-xl text-zinc-400">
        {title}
      </h2>
    </>
  );
};

export default VideoContainer;
