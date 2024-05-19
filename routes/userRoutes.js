const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { register, login, updateUserProfile, deleteUser, getAllUsers, getUserByUsername } = require('../models/usersModel');
const { authenticateJWT } = require('../middleware/authMiddleware');
const { SECRET_KEY } = require('../config');
const { ExpressError, BadRequestError } = require('../expressError');

// Updated register route
router.post('/api/register', async (req, res) => {
    const { username, email, password, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song } = req.body;

    try {
        // Call the register function to register the user
        const userId = await register(username, email, password, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song);

        // Respond with success message and user ID
        res.status(201).json({ message: `${username} registered successfully`, userId });
    } catch (error) {
        if (error.message === 'Username already taken. Please choose another Username.') {
            // Custom error message for duplicate username
            res.status(400).json({ error: 'Username already taken. Please choose another Username.' });
        } else {
            // Other errors are treated as server errors
            res.status(500).json({ error: 'An error occurred while registering user' });
        }
    }
});

// Login route
router.post('/api/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required" });
        }

        // Call the login function to authenticate user
        const authResult = await login(username, password);

        // If authentication successful, return token and username
        res.json({ message: authResult.message, token: authResult.token, username });
    } catch (error) {
        if (error.message === "Invalid username or password") {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // For other errors, use error handling middleware
        next(error);
    }
});

// Define the route to fetch user profile
router.get('/api/users/profile/:username', authenticateJWT, async (req, res, next) => {
    try {
        const username = req.params.username; // Get the username from the request parameters
        console.log('Username:', username);
        const user = await getUserByUsername(username); // Fetch user by username

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user); // Return user data
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
});

// PATCH route to update user profiles
router.patch('/api/users/:username', authenticateJWT, async (req, res) => {
    try {
        const username = req.params.username;
        const updates = req.body;
        const tokenUsername = req.user.username; // Extract the username from the token

        // Logging username and tokenUsername for debugging
        console.log(`Username from params: ${username}`);
        console.log(`Username from token: ${tokenUsername}`);

        // Check if the token's username matches the route's username
        if (tokenUsername !== username) {
            return res.status(401).json({ error: 'Unauthorized! Must login to edit profile.' });
        }

        // Call the updateUserProfile function to update the user profile
        const message = await updateUserProfile(username, updates);

        // Respond with success message
        res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user profile' });
    }
});


// DELETE route to delete user profile
router.delete('/api/users/:username', authenticateJWT, async (req, res) => {
    const username = req.params.username;
    const authenticatedUser = req.user; // Extract authenticated user from request object

    try {
        // Call the deleteUser function to delete the user profile
        await deleteUser(username, authenticatedUser);

        // Respond with a success message
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        // Handle errors and respond with an appropriate error message
        console.error('Error deleting user profile:', error);
        if (error instanceof ExpressError) {
            return res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred while deleting user profile' });
        }
    }
});


module.exports = router;
