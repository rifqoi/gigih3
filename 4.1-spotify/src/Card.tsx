import React from "react";
import "./assets/style.css";

const Card: React.FC<{ song: string; artist: string }> = ({ song, artist }) => {
  return (
    <>
      <div className="card">
        <div className="box">
          <img
            className="song-image"
            src="https://yt3.googleusercontent.com/ytc/AOPolaQlw5OLFmr_0bK5SuYGVzEf2xprKANdPxh025mjNq4=s900-c-k-c0x00ffffff-no-rj"
          />
        </div>
        <div className="card-container">
          <h3>
            <b>{song}</b>
          </h3>
          <p>{artist}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
