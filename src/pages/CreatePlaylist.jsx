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
        color: black;
        color: ${props => props.isChecked && 'red'};
        margin: 0;
        padding-left: 15px;
        padding-top: 15px;
    }
`

export function GenreItem(props) {
    const dispatch = useDispatch()
    const { genre, checked } = props

    return (
        <>
        <GenreContainer checked={checked}>
        <div className="genre-item josefin-sans-small-text">
            <button className="genre-checkbox"onClick={() => {
                dispatch(toggleGenre(genre))
                }}>Add</button>
            <p>{genre}</p>
        </div>
        </GenreContainer>
        </>
    )
}

function CreatePlaylist(props) {
    const allTracks = props
    console.log(allTracks)
    // perform playlist creation here
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        // async function createPlaylist(tracksUri){
        //     const { id: user_id } = await fetchWebApi('v1/me', 'GET')
          
        //     const playlist = await fetchWebApi(
        //       `v1/users/${user_id}/playlists`, 'POST', {
        //         "name": "My recommendation playlist",
        //         "description": "Playlist created by the tutorial on developer.spotify.com",
        //         "public": false
        //     })
          
        //     await fetchWebApi(
        //       `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
        //       'POST'
        //     );
          
        //     return playlist;
        //   }

        const grabUserId = async () => {
            const response = await fetch(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            const data = await response.json();
            // const userId = data.id
            console.log(data.id)
            createNewBlankPlaylist(data)
        }

        const createNewBlankPlaylist = async (user) => {
            const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                method: 'POST',
                body: JSON.stringify({ 
                    name: `Genrefy Created Playlist for ${user.display_name}`,
                    description: 'A catered playlist created using CS494 Final project from Team 15',
                    public: false
                }),
                headers: { Authorization: "Bearer " + token },
                
            })
            const data = await response.json();
            // console.log(data);
        }

        grabUserId()

    }, []);
}



function GrabPlaylistGenreTracks(props) {
    const allGenresChecked = props
    // perform playlist creation here
    const token = localStorage.getItem("accessToken");
    // grab all genres and set into array
    const [genreStringArr, setGenreStringArr] = useState(allGenresChecked.allGenresChecked.map(item => item.genre));


    const [currPlaylistId, setCurrPlaylistId] = useState("");
    const [randomTracks, setRandomTracks] = useState([]); // array or all track id's grabbed from each genre playlist

    // console.log(genreStringArr)

    useEffect(() =>  {

        let allRequestsCompleted = false;


        const fetchCategory = async (genreAtIndex) => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/browse/categories/${genreAtIndex}/playlists`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                });
                const data = await response.json();
                const playlistId = data.playlists.items[0].id; // HARD INPUT: First playlist grabbed from found genre
                setCurrPlaylistId(playlistId);
    
                console.log("== playlist id of first playlist grabbed from genres: ", playlistId);
                
                // Fetch playlist tracks based on retrieved playlist ID from genre
                fetchPlaylistTrack(playlistId);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };
        
        const fetchPlaylistTrack = async (playlistId) => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                });
                const data = await response.json();
        
                //array holding random tracks from playlist
                const currRandomTracks = [];
                const totalTracks = data.total;
                // hard input 5 random tracks to be added per every genre
                for (let i = 0; i < 5; i++) {
                    const randomIndex = Math.floor(Math.random() * totalTracks);
                    currRandomTracks.push(data.items[randomIndex].track.uri);
                }
    
                // set random tracks from playlist into array of all songs.
                setRandomTracks(prevRandomTracks => [...prevRandomTracks, ...currRandomTracks]);
    
            } catch (error) {
                console.error("Error fetching playlist tracks:", error);
            }
        };
        // run fetching category per however many genres are selected
        for (let i = 0; i < genreStringArr.length; i++) {
            fetchCategory(genreStringArr[i]);
        }
    }, []);

    return (
        <>
        {(randomTracks.length >= genreStringArr.length * 5) && <CreatePlaylist randomTracks={randomTracks}/>}
        </>
    )

}


export default function Search() {
    const dispatch = useDispatch()
    const allSliceGenres = useSelector((state) => state.genres)
    const [selectedGenres, setSelectedGenres] = useState(null);



    return (
        <div className="createplaylist-page">
            {/* <h1>Create Playlist</h1> */}
            <div className="create-playlist-container">
                <div className="genre-list">
                    {allSliceGenres.genres.map((item, index) => 
                        (<GenreItem key={index} genre={item.genre} checked={item.checked} />))}
                </div>

                <button className="save-playlist-button josefin-sans-small-text" onClick={() => {
                    const currSelectedGenres = allSliceGenres.genres.filter((g) => g.checked === true)
                    setSelectedGenres(currSelectedGenres)
                    }}>Save Playlist!</button>

                {selectedGenres && <GrabPlaylistGenreTracks allGenresChecked={selectedGenres}/>}
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