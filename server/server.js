import express from "express";
import axios from "axios";
import querystring from "querystring";

const app = express();
const PORT = process.env.PORT || 3000;

async function getSpotifyAccessToken() {
  const clientId = "8da8371ea6434a9a9117c62871f38602";
  const clientSecret = "c10c7e8416e44d1bb3609b852310efff";

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            clientId + ":" + clientSecret
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Failed to retrieve Spotify access token:", error);
    return null;
  }
}

app.get("/api/spotify-token", async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    res.json({ accessToken });
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
