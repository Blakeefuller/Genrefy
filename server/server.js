import express from "express";
import axios from "axios";
import querystring from "querystring";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Only allow requests from this origin
  })
);

const PORT = process.env.PORT || 3000;

const clientId = "f6bb9ad7d28749cd9a160fb001d4dee1";
const clientSecret = "e11217c9db6547a69d132505bacdbfbb";

app.get("/api/getToken", async (req, res) => {
  const code = req.query.code || null;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code: code,
        redirect_uri: "http://localhost:5173/callback",
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("RESPONSE", response.data.access_token);

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("Error during token exchange:", error.response.data);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
