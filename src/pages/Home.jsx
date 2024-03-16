import queryString from "query-string";
import React, { useEffect, useState } from "react";

export default function Home() {
  const initiateLogin = () => {
    const state = generateRandomString(16); // Generate a random state value for security
    const scope = "user-read-private user-read-email"; // Define the scopes your application needs
    const clientId = "f6bb9ad7d28749cd9a160fb001d4dee1"; // Your Spotify client ID
    const redirectUri = "http://localhost:5173/callback"; // Make sure this matches your actual callback URI

    const queryParams = queryString.stringify({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
  };

  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <div className="home-page">
      {/* <h1>Welcome to My App!</h1>
      <p>This is the homepage of my app.</p>
      {accessToken && <p>Spotify Access Token: {accessToken}</p>} */}

      {/* ACTUAL HOME STUFF HERE */}
      <button onClick={initiateLogin}>Login with Spotify</button>
      <div className="home-info-container">
        <h2 className="josefin-sans-small-header underline">
          What is Genrefy?
        </h2>
        <p className="josefin-sans-small-text">
          With our innovative platform, you can delve into the realm of music
          like never before. Craft your own bespoke playlists, meticulously
          tailored to your tastes, thanks to our genre/mood enhancement feature.
          This cutting-edge tool allows you to refine your musical journey,
          selecting from a plethora of genres and moods to create the perfect
          sonic atmosphere.
        </p>
        <div className="left-arrow arrow-graphic"></div>
        <div className="click-here-text shadows-into-font">Click here!</div>
      </div>
      <div className="create-playlist-home-button-container">
        <a
          className="create-playlist-home-button josefin-sans-small-text-button"
          href="/create-playlist"
        >
          Create Playlist
        </a>
      </div>
    </div>
  );
}
