import { useEffect, useState } from "react";
import { clientId, redirectUri } from "../auth/spotify";

export interface SpotifyProfile {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: any[];
  type: string;
  uri: string;
  followers: Followers;
  country: string;
  product: string;
  explicit_content: ExplicitContent;
  email: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: any;
  total: number;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

const useSpotifyProfile = (): [
  SpotifyProfile | undefined,
  string | undefined
] => {
  const [spotifyProfile, setSpotifyProfile] = useState<SpotifyProfile>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");
    getProfile(accessToken!)
      .then((data) => {
        setSpotifyProfile(data);
      })
      .catch((error) => {
        const e = error as Error;
        setError(e.message);
      });
  }, []);

  return [spotifyProfile, error];
};

async function refreshAccessToken() {
  let codeVerifier = localStorage.getItem("code_verifier");
  let refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    return;
  }

  let body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: refreshToken,
  });

  const response = fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getProfile(accessToken?: string) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!response.ok) {
    throw new Error("Unexpected error");
  }

  const data: SpotifyProfile = await response.json();

  return data;
}

export default useSpotifyProfile;
