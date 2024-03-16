import { useEffect, useState } from "react";

export default function Profile() {
  const [profileData, setProfileData] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User profile:", data);
        if (data) {
          setProfileData(data);
        } else {
          console.log("No profile data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>{profileData.display_name}</p>
      <p>{profileData.email}</p>
      <p>{profileData.id}</p>
      <h2>Playlists</h2>
    </div>
  );
}
