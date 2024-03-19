import { all } from "axios";

export function GenreItem(props) {

    const { genreName } = props

    return (
        <>
        <div className="genre-item">
            <input className="genre-checkbox" type="checkbox" value={genreName}/>
            {/* <button className="genre-checkbox">&#10004;</button>{genreName} */}
            <span className="checkmark">{genreName}</span>
        </div>
        </>
    )
}

export function CreatePlaylist(allGenresChecked) {
    console.log(allGenresChecked)
}


export default function Search() {

    // hard coded genres users can choose from
    const allGenres = ["pop", "rnb", "dinner", "party", "jazz", "rock", "hiphop", "country", "workout", "latin", "disney", "indie"]

    const allGenresChecked = document.querySelectorAll('input[type=checkbox]:checked');
        
    return (
        <div className="createplaylist-page">
            {/* <h1>Create Playlist</h1> */}
            <div className="create-playlist-container">
                <div className="genre-list">
                    {allGenres.map((item, index) => 
                        (<GenreItem key={index} genreName={item} />))}
                </div>

                <button onClick={() => {console.log(allGenresChecked)}}>Save Playlist!</button>
{/* 
                <a
                className="create-playlist-home-button josefin-sans-small-text-button"
                href="/create-playlist"
                >
                    <div className="create-playlist-home-button-container">
                Save & View Playlist
                </div>
                </a> */}
            </div>
        </div>
    )
}