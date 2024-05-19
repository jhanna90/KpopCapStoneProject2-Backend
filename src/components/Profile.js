import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams(); // Get the username from the URL
    const navigate = useNavigate(); // Navigation hook
    const [userData, setUserData] = useState(null); // Holds user data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token
                if (!token) {
                    navigate('/login'); // Redirect to login if not authenticated
                    return; // Early exit
                }

                // Fetch user data with the token in the request headers
                const response = await axios.get(`/api/users/profile/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data) {
                    setUserData(response.data); // Set user data
                    setLoading(false); // Stop loading
                } else {
                    throw new Error('No user data found'); // Handle empty response
                }
            } catch (err) {
                console.error('Error fetching user data:', err.message); // Log errors
                setError(`Error fetching user data: ${err.response?.data?.error || err.message}`); // Display error
                setLoading(false);
            }
        };

        fetchUserData(); // Fetch user data on component mount
    }, [navigate, username]); // Update dependency array

    const handleDeleteProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            if (!token) {
                navigate('/login'); // Redirect if not authenticated
                return; // Early exit
            }

            // Send the token in the request headers when deleting the profile
            await axios.delete(`/api/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.removeItem('token'); // Clear the token
            navigate('/'); // Redirect after successful deletion
        } catch (error) {
            console.error('Error deleting profile:', error.response?.data || error.message); // Log errors
            setError('Unauthorized: You are not authorized to delete this account. Please return to the homepage!'); // Display error message
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    if (error) {
        return <div>{error}
            <>
                <br />
                <br />
                <img
                    src="https://i.pinimg.com/originals/3a/17/ef/3a17ef6e854a0e63ee2da75367949a45.gif"
                    alt="Sorry GIF"
                />
            </></div>; // Display the error message
    }

    if (!userData) {
        return <div>No user data available</div>; // Safety check
    }

    return (
        <div>
            <h2>User Profile</h2>
            {/* Display user information */}
            <div>
                {userData && (
                    <>
                        <p>Username: {userData.username}</p>
                        <p>Favorite Boy Group: {userData.fav_boy_group}</p>
                        <p>Favorite Girl Group: {userData.fav_girl_group}</p>
                        <p>Bias: {userData.bias}</p>
                        <p>Alt Bias: {userData.alt_bias}</p>
                        <p>Bias Wrecker: {userData.bias_wrecker}</p>
                        <p>Favorite Girl Group Song: {userData.fav_girl_group_song}</p>
                        <p>Favorite Boy Group Song: {userData.fav_boy_group_song}</p>
                    </>
                )}
            </div>

            {/* Edit and Delete Profile buttons */}
            <button onClick={() => navigate(`/profile/edit/${username}`)}>Edit Your Profile</button>
            <button onClick={handleDeleteProfile}>Delete Your Profile</button>
        </div>
    );
};

export default Profile;
