import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to set username in local storage
const setUsernameInLocalStorage = (username) => {
    localStorage.setItem('username', username);
};

// Function to retrieve username from local storage
const getUsernameFromLocalStorage = () => {
    return localStorage.getItem('username');
};

const NavBar = () => {
    const navigate = useNavigate(); // Navigation hook

    // Function to check if the user is logged in
    const isLoggedIn = () => {
        const token = localStorage.getItem('token'); // Check for token in local storage
        return Boolean(token); // Return true if token exists
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        navigate('/'); // Redirect to the home page after logout
    };

    // Function to navigate to the user's profile page if logged in
    const isUser = () => {
        if (isLoggedIn()) {
            const username = getUsernameFromLocalStorage(); // Retrieve username from local storage
            if (username) {
                navigate(`/profile/${username}`); // Navigate to the profile page with the username
            } else {
                // If username is not available in local storage, handle accordingly
                console.error('Username not found in local storage');
                // You can redirect to a different page or display an error message
            }
        } else {
            // If user is not logged in, redirect to the login page
            navigate('/login');
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav>
            <ul>
                <li>
                    <button onClick={() => handleNavigation('/videos')}>Videos</button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('/idols')}>Idols</button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('/groups')}>Groups</button>
                </li>
                <li>
                    <button onClick={isUser}>Profile</button> {/* Button to navigate to profile page */}
                </li>

                {/* Conditionally render Login or Logout based on user login status */}
                {isLoggedIn() ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button> {/* Button to handle logout */}
                    </li>
                ) : (
                    <li>
                        <button onClick={() => handleNavigation('/login')}>Login</button> {/* Button to login page */}
                    </li>
                )}
                <li>
                    <button onClick={() => handleNavigation('/register')}>Create Account!</button> {/* Button to registration page */}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
