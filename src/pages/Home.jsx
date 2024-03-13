import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get("/api/spotify-token");
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error("Error fetching Spotify access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div className="home-page">
      {/* <h1>Welcome to My App!</h1>
      <p>This is the homepage of my app.</p>
      {accessToken && <p>Spotify Access Token: {accessToken}</p>} */}

      {/* ACTUAL HOME STUFF HERE */}
      <div className="home-info-container">
        <h2 className="josefin-sans-small-header underline">What is Genrefy?</h2>
        <p className="josefin-sans-small-text">
          With our innovative platform, you can delve into the realm of music like never before. Craft your own bespoke playlists, meticulously tailored to your tastes, thanks to our genre/mood enhancement feature. This cutting-edge tool allows you to refine your musical journey, selecting from a plethora of genres and moods to create the perfect sonic atmosphere.
        </p>
        <div className="left-arrow arrow-graphic"></div>
        <div className="click-here-text shadows-into-font">Click here!</div>
      </div>
      <div className="create-playlist-home-button-container">
          <a className="create-playlist-home-button josefin-sans-small-text-button" href="/create-playlist">Create Playlist</a>
        </div>
    </div>
  );
}
