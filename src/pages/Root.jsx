import { NavLink, Outlet } from 'react-router-dom'

export default function Root() {

    return (
        <>
            <div className="nav-container">
                <div className="navTitle">
                    <NavLink className="navItem" to="/home">Genrefy</NavLink>
                </div>
                <div className="navElements">
                    <NavLink className="navItem" to="/profile">Profile</NavLink>
                    <NavLink className="navItem" to="/create-playlist">Create Playlist</NavLink>
                    <NavLink className="navItem" to="/view-playlist">View Playlist</NavLink>
                    <NavLink className="navItem" to="/settings">Settings</NavLink>
                </div>
            </div>
            <main><Outlet /></main>
        </>
    )
}
