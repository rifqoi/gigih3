import React from "react";

type VideoCardType = {
  id: number;
  thumbnailURL: string;
  title: string;
};

const VideoCard: React.FC<VideoCardType> = ({ id, thumbnailURL, title }) => {
  return (
    <>
      <a href={"/videos/" + id}>
        <div className=" w-60 overflow-hidden rounded-lg">
          <div
            className="flex h-[430px] flex-col justify-end bg-center object-cover shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] "
            style={{
              backgroundImage: `url(${thumbnailURL})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex h-1/2 flex-col justify-end bg-gradient-to-t from-black to-transparent p-3">
              <h2 className="text-lg text-white ">{title}</h2>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default VideoCard;
