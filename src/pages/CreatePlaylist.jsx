import { all } from "axios";
import { addGenre, toggleGenre } from "../genreSlice";
import { getSelectedGenres } from "../genreSlice";
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { useEffect, useState } from "react";


const GenreContainer = styled.div`
    // margin: auto;
    text-decoration: ${props => props.isChecked && 'line-through'};
    color: ${props => props.isChecked && 'black'};
    button {
        margin: 0;
    }
    p {
        color: ${props => props.isChecked && 'black'};
        color: black;
        margin: 0;
        padding-left: 15px;
    }
`

export function GenreItem(props) {
    const dispatch = useDispatch()

    const { genre, checked } = props

    return (
        <>
        <GenreContainer checked={checked}>
        <div className="genre-item">
            <button className="genre-checkbox" onClick={() => {
                dispatch(toggleGenre(genre))
                }}>Add</button>
            <p>{genre}</p>
        </div>
        </GenreContainer>
        </>
    )
}

function CreatePlaylist(props) {
    const allGenresChecked = props
    // perform playlist creation here
    const token = localStorage.getItem("accessToken");
    console.log(allGenresChecked)


    // useEffect(() => {
    //     // fetch categories based on allGenresChecked array
    //     fetch("https://api.spotify.com/v1/browse/categories")
    // }, []);

    // console.log(allGenresChecked)

}


export default function Search() {
    const dispatch = useDispatch()
    const allSliceGenres = useSelector((state) => state.genres)
    const [selectedGenres, setSelectedGenres] = useState([]);



    return (
        <div className="createplaylist-page">
            {/* <h1>Create Playlist</h1> */}
            <div className="create-playlist-container">
                <div className="genre-list">
                    {allSliceGenres.genres.map((item, index) => 
                        (<GenreItem key={index} genre={item.genre} checked={item.checked} />))}
                </div>

                <button onClick={() => {
                    const currSelectedGenres = allSliceGenres.genres.filter((g) => g.checked === true)
                    setSelectedGenres(currSelectedGenres)
                    }}>Save Playlist!</button>

                {selectedGenres && <CreatePlaylist allGenresChecked={selectedGenres}/>}
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