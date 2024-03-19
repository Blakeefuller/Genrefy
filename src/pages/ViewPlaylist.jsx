import { useParams } from 'react-router-dom'; // or your preferred routing library

export default function ViewPlaylist() {
  const { id } = useParams();

  return (
    <div className="viewplaylist-page">
      <h1>View Playlist</h1>
      <iframe
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/playlist/${id}`}
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}