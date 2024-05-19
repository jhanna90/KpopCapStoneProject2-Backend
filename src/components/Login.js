import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Navigation hook
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(''); // State to manage error messages

    // Function to set username in local storage
    const setUsernameInLocalStorage = (username) => {
        localStorage.setItem('username', username);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setError(''); // Clear any previous errors

        // Check for empty fields
        if (!formData.username || !formData.password) {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await axios.post('/api/login', formData); // Send login request

            if (response.data.token) {
                // Store the token
                localStorage.setItem('token', response.data.token);

                // Extract username from response data
                const { username } = response.data;

                // Store username in local storage
                setUsernameInLocalStorage(username);

                // Redirect to /videos upon successful login
                navigate(`/profile/${username}`);
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (error) {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit">Login</button> {/* Submit login form */}
            </form>
            <p>Don't have an account? <button onClick={() => navigate('/register')}>Create Account</button></p>
        </div>
    );
};

export default Login;
