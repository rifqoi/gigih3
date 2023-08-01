import { useEffect, useState } from "react";
import "./App.css";
import { getAccessToken, getCodeVerifier } from "./auth/spotify";
import useSpotifyProfile from "./hooks/useSpotifyAuth";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  if (code || code !== null) {
    getAccessToken(code);
  }

  const onClick = async () => {
    const url = await getCodeVerifier();
    window.location.href = url;
  };

  const [spotifyProfile, error] = useSpotifyProfile();

  return (
    <>
      <h1>Welcome to Spotify</h1>
      {error ? (
        <a href="#" onClick={onClick}>
          Login to Spotify
        </a>
      ) : (
        <h1>Hello {spotifyProfile?.display_name}</h1>
      )}
    </>
  );
}

export default App;
