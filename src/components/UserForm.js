import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fav_boy_group: '',
        fav_girl_group: '',
        bias: '',
        alt_bias: '',
        bias_wrecker: '',
        fav_girl_group_song: '',
        fav_boy_group_song: ''
    });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send registration request
            const response = await axios.post('/api/register', formData);

            // Check if registration was successful
            if (response.status === 201) {
                // Set registration success state
                setRegistrationSuccess(true);
            } else {
                // Redirect to error route
                navigate('/error');
            }
        } catch (error) {
            // Redirect to error route
            navigate('/error');
        }
    };

    useEffect(() => {
        let timeout;
        if (registrationSuccess) {
            // Set timeout to redirect after 5 seconds
            timeout = setTimeout(() => {
                navigate('/login');
            }, 2000);
        }

        // Clear timeout on component unmount
        return () => clearTimeout(timeout);
    }, [registrationSuccess, navigate]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <input
                    type="text"
                    name="fav_boy_group"
                    placeholder="Favorite Boy Group"
                    value={formData.fav_boy_group}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="fav_girl_group"
                    placeholder="Favorite Girl Group"
                    value={formData.fav_girl_group}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="bias"
                    placeholder="Bias"
                    value={formData.bias}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="alt_bias"
                    placeholder="Alt Bias"
                    alue={formData.alt_bias}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="bias_wrecker"
                    placeholder="Bias Wrecker"
                    value={formData.bias_wrecker}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="fav_girl_group_song"
                    placeholder="Favorite Girl Group Song"
                    value={formData.fav_girl_group_song}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="fav_boy_group_song"
                    placeholder="Favorite Boy Group Song"
                    value={formData.fav_boy_group_song}
                    onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
            {registrationSuccess && (
                <div>
                    <p>User registered successfully!</p>
                </div>
            )}
        </div>
    );
};

export default UserForm;

