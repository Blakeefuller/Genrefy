import { NavLink, Outlet } from 'react-router-dom'

export default function Root() {
    return (
        <div className="page-container">
            <h1 className='header'>
                <NavLink to="/home">Genrefy</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/create-playlist">Create Playlist</NavLink>
                <NavLink to="/view-playlist">View Playlist</NavLink>
                <NavLink to="/settings">Settings</NavLink>
            </h1>
            <main><Outlet /></main>
        </div>
    )
}
