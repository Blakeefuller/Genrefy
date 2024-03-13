import { useEffect, useState } from 'react';
import axios from "axios";

export default function Profile({accessToken}){
    const [profilePic, setProfilePic] = useState('');
    const accessTokenString = JSON.stringify(accessToken);
    console.log('Access token:', accessTokenString);
    
    useEffect(() => {
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + accessTokenString
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('User profile:', data);
            if (data.images && data.images.length > 0) {
                setProfilePic(data.images[0].url);
            } else {
                console.log('No profile picture found');
            }
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <img src={profilePic} alt="Profile" />
            <h2>Playlists</h2>
        </div>
    );
}