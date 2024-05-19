import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('/api/videos');
                setVideos(response.data.videos);
                setLoading(false);
            } catch (error) {
                setError('Error fetching videos');
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Reset loading state
        setError(null); // Reset error state

        try {
            const response = await axios.get(`/api/videos/${searchTerm}`);

            if (response.data.videos.length === 0) {
                setVideos([]); // No results
                setError('Sorry! Video not found 😢. Would you like to add it?'); // Custom message
            } else {
                setVideos(response.data.videos); // Set the found videos
            }

            setLoading(false);
        } catch (err) {
            setError(` ${err.response?.data?.error || err.message}`); // Handle errors
            setLoading(false);
        }
    };

    const handleAddVideo = () => {
        navigate('/videos/add'); // Navigate to Add Video page
    };

    return (
        <div>
            <h2>Video List</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a video"
                />
                <button type="submit">Search</button> {/* Submits the form */}
            </form>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>
                    {error}
                    {error.includes('Sorry! Video not found 😢. Would you like to add it?') && (
                        <>
                            <br />
                            <button onClick={handleAddVideo}>Add Video</button>
                            <br />
                            <img
                                src="https://pa1.aminoapps.com/7247/fb487526b9707cca74179e1ede5c1ad880b02246r1-480-270_hq.gif"
                                alt="Sorry GIF"
                            />
                        </>
                    )}
                </div>
            ) : (
                <ul>
                    {videos.map((video) => (
                        <li key={video.id}>
                            <p>
                                Song Name:
                                <a href={video.video} target="_blank" rel="noopener noreferrer">
                                    {video.song_name}
                                </a>
                            </p>
                            <p>Artist: {video.artist}</p>
                            <p>Korean Name: {video.korean_name || 'Unknown'}</p>
                            <p>Release Date: {video.release_date || 'Unknown'}</p>
                            <p>Director: {video.director || 'Unknown'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VideoList;
