import { useParams } from 'react-router-dom'; 

export default function ViewPlaylist() {
  let { id } = useParams();

  if (id===':id' || id==='') {
    return (
      <div className="viewplaylist-page">
        <h1>You can only view a playlist by clicking a link to one in your profile page</h1>
      </div>
    );
  }

  return (
    <div className="viewplaylist-page">
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