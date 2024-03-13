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
      <h1>Welcome to My App!</h1>
      <p>This is the homepage of my app.</p>
      {accessToken && <p>Spotify Access Token: {accessToken}</p>}
    </div>
  );
}
