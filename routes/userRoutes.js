const express = require('express');
const router = express.Router();
const { register, login, getUserById, updateUserProfile, deleteUser, getAllUsers } = require('../models/usersModel');
const { authenticateJWT } = require('../middleware/authMiddleware');

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

// router.post('/api/login', async (req, res, next) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             throw new ExpressError("Username and password required", 400);
//         }
//         const results = await db.query(
//             `SELECT username, password 
//          FROM users
//          WHERE username = $1`,
//             [username]);
//         const user = results.rows[0];
//         if (user) {
//             if (await bcrypt.compare(password, user.password)) {
//                 const token = jwt.sign({ username }, SECRET_KEY);
//                 return res.json({ message: `${username} is logged in!`, token })
//             }
//         }
//         throw new ExpressError("Invalid username/password", 400);
//     } catch (e) {
//         return next(e);
//     }
// });

// router.post('/api/login', async (req, res, next) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             throw new Error("Username and password required");
//         }

//         // Call the login function to authenticate user
//         const authResult = await login(username, password);

//         // If authentication successful, return token
//         res.json({ message: authResult.message, token: authResult.token });
//     } catch (error) {
//         next(error);
//     }
// });

router.post('/api/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error("Username and password required");
        }

        // Call the login function to authenticate user
        const authResult = await login(username, password);

        // If authentication successful, return token and username
        res.json({ message: authResult.message, token: authResult.token, username });
    } catch (error) {
        next(error);
    }
});


router.get('/api/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing' });
        }

        // Call the getUserById function to retrieve the user
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the user object
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET route to fetch information for all users
router.get('/api/users', async (req, res) => {
    try {
        // Fetch information for all users from the database
        const users = await getAllUsers();

        // Respond with the user information
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'An error occurred while fetching user information' });
    }
});

// Assume you have a route to retrieve user profile data by username
router.get('/api/users/profile/:username', authenticateJWT, async (req, res) => {
    try {
        const username = req.params.username;
        // Call a function to fetch user profile data based on the username
        const userData = await getUserByUsername(username);
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Respond with the user profile data
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// PATCH route to update user profile
router.patch('/api/users/:userId', authenticateJWT, async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = req.body;

        // Call the updateUserProfile function to update the user profile
        const message = await updateUserProfile(userId, updates);

        // Respond with success message
        res.status(200).json({ message });
    } catch (error) {
        // Handle errors
        if (error.message === 'unauthorized') {
            res.status(401).json({ error: 'Unauthorized! Must login to edit profile.' });
        } else {
            console.error('Error updating user profile:', error);
            res.status(500).json({ error: 'Error updating user profile' });
        }
    }
});


// Route for deleting a user
router.delete('/api/delete', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, SECRET_KEY);
        const username = decoded.username;

        // Call the delete function to delete the user
        await deleteUser(username);

        // Respond with success message
        res.status(200).json({ message: `${username}'s profile was deleted successfully` });
    } catch (error) {
        // Handle token verification errors or deletion errors
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'Error deleting user profile' });
    }
});


module.exports = router;
