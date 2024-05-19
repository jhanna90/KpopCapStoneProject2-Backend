import React, { useState } from 'react';
import axios from 'axios';

const VideoAdd = () => {
    // States for form inputs
    const [songName, setSongName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [artist, setArtist] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [director, setDirector] = useState('');
    const [koreanName, setKoreanName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVideo = {
            song_name: songName,
            video: videoUrl, // Send the video URL
            artist,
            release_date: releaseDate,
            director,
            korean_name: koreanName
        };
        try {
            await axios.post('/api/videos', newVideo);
            // Redirect to the video list page after adding
            window.location.href = '/videos';
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    return (
        <div>
            <h2>Add a New Video</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="songName">Song Name:</label>
                    <input
                        id="songName"
                        type="text"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="videoUrl">Video URL:</label>
                    <input
                        id="videoUrl"
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="koreanName">Korean Name:</label>
                    <input
                        id="koreanName"
                        type="text"
                        name="korean_name"
                        value={koreanName}
                        onChange={(e) => setKoreanName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="artist">Artist:</label>
                    <input
                        id="artist"
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                        id="releaseDate"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="director">Director:</label>
                    <input
                        id="director"
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </div>
                <button type="submit">Add Video</button>
            </form>
        </div>
    );
};

export default VideoAdd;