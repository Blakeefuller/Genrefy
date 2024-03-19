import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // or your preferred routing library

export default function Profile() {
  const [profileData, setProfileData] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch profile data
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

    // Fetch playlists
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Playlists:", data);
        if (data && data.items) {
          setPlaylists(data.items);
        } else {
          console.log("No playlists found");
        }
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  return (
    <div className="profile-page">
      {/* Render profile data */}
      {profileData && (
        <div>
          <h1>{profileData.display_name}</h1>
          {profileData.images && profileData.images[0] && (
            <img src={profileData.images[0].url} alt="Profile" />
          )}
        </div>
      )}
  
    {<h1>Your Playlists (Click Title to View)</h1>}
    
    {
    <div className="playlist-items-container">{playlists.map((playlist) => (
      <div key={playlist.id}>
        {playlist.images && playlist.images[0] && (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        )}
        <div><Link className="playlist-title" to={`/view-playlist/${playlist.id}`}>
          {playlist.name}
        </Link></div>
      </div>
    ))}</div>}
    </div>
  );
}