import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../themeContext";
import "./Settings.css";

export default function Root() {
  const { theme } = useTheme();

  return (
    <>
      <div className={`nav-container ${theme}`}>
        <div className="navTitle">
          <NavLink className="navItem" to="/home">
            Genrefy
          </NavLink>
        </div>
        <div className="navElements">
          <NavLink className="navItem" to="/profile">
            Profile
          </NavLink>
          <NavLink className="navItem" to="/create-playlist">
            Create Playlist
          </NavLink>
          <NavLink className="navItem" to="/view-playlist/:id">
            View Playlist
          </NavLink>
          <NavLink className="navItem" to="/settings">
            Settings
          </NavLink>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
