import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileEdit = () => {
    const { username } = useParams(); // Get the username from the URL
    const navigate = useNavigate(); // Navigation hook
    const [formData, setFormData] = useState({
        fav_boy_group: '',
        fav_girl_group: '',
        bias: '',
        alt_bias: '',
        bias_wrecker: '',
        fav_girl_group_song: '',
        fav_boy_group_song: ''
    });
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
                    setFormData(response.data); // Set form data with user data
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            if (!token) {
                navigate('/login'); // Redirect to login if not authenticated
                return; // Early exit
            }

            // Update user data with the token in the request headers
            await axios.patch(`/api/users/${username}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate(`/profile/${username}`); // Redirect to profile page after successful update
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message); // Log errors
            setError('Error updating profile. Please try again.'); // Display error message
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    if (error) {
        return <div>{error}</div>; // Display the error message
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fav_boy_group">Favorite Boy Group:</label>
                    <input
                        type="text"
                        id="fav_boy_group"
                        name="fav_boy_group"
                        value={formData.fav_boy_group}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="fav_girl_group">Favorite Girl Group:</label>
                    <input
                        type="text"
                        id="fav_girl_group"
                        name="fav_girl_group"
                        value={formData.fav_girl_group}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="bias">Bias:</label>
                    <input
                        type="text"
                        id="bias"
                        name="bias"
                        value={formData.bias}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="alt_bias">Alt Bias:</label>
                    <input
                        type="text"
                        id="alt_bias"
                        name="alt_bias"
                        value={formData.alt_bias}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="bias_wrecker">Bias Wrecker:</label>
                    <input
                        type="text"
                        id="bias_wrecker"
                        name="bias_wrecker"
                        value={formData.bias_wrecker}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="fav_girl_group_song">Favorite Girl Group Song:</label>
                    <input
                        type="text"
                        id="fav_girl_group_song"
                        name="fav_girl_group_song"
                        value={formData.fav_girl_group_song}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="fav_boy_group_song">Favorite Boy Group Song:</label>
                    <input
                        type="text"
                        id="fav_boy_group_song"
                        name="fav_boy_group_song"
                        value={formData.fav_boy_group_song}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileEdit;

