// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('./config');
// const ExpressError = require("./expressError")
// const db = require('./db');
// const express = require('express');
// const router = express.Router();
// const { getKpopIdols } = require('./models/idolModel');
// const { getKpopIdolByName } = require('./models/idolModel');
// const {
//     getBoyGroups,
//     getBoyGroupByName,
//     getGirlGroups,
//     getGirlGroupByName,
// } = require('./models/groupsModel'); // Assuming your model.js file is located in the same directory as routes.js
// const { getAllVideos, searchVideos } = require('./models/videoModel');
// const { register, login, getUserById, updateUserProfile, deleteUser } = require('./models/usersModel');
// const { authenticateUser, verifyToken, authenticateToken, authenticateJWT } = require('./middleware/authMiddleware');
// const updateBoyGroup = require('./models/boyGroupModel')


// router.get('/api/idols', async (req, res, next) => {
//     try {
//         const idols = await getKpopIdols(req.query);
//         return res.json({ idols });
//     } catch (error) {
//         return next(error);
//     }
// });

// router.get('/api/idols/:name', async (req, res, next) => {
//     const { name } = req.params;
//     try {
//         const idols = await getKpopIdolByName(name);
//         if (!idols || idols.length === 0) {
//             return res.status(404).json({ message: 'Idol not found' });
//         }
//         return res.json({ idols });
//     } catch (error) {
//         return next(error);
//     }
// });

// // Route to get all boy groups
// router.get('/api/boy-groups', async (req, res, next) => {
//     try {
//         const boyGroups = await getBoyGroups();
//         return res.json({ boyGroups });
//     } catch (error) {
//         return next(error);
//     }
// });

// // Route to search for boy groups by name
// router.get('/api/boy-groups/:name', async (req, res, next) => {
//     const { name } = req.params;
//     try {
//         const boyGroups = await getBoyGroupByName(name);
//         if (boyGroups.length === 0) {
//             return res.status(404).json({ message: 'Boy Group Not Found.' });
//         }
//         return res.json({ boyGroups });
//     } catch (error) {
//         return next(error);
//     }
// });


// // Route to get all girl groups
// router.get('/api/girl-groups', async (req, res, next) => {
//     try {
//         const girlGroups = await getGirlGroups();
//         return res.json({ girlGroups });
//     } catch (error) {
//         return next(error);
//     }
// });

// // Route to search for girl groups by name
// router.get('/api/girl-groups/:name', async (req, res, next) => {
//     const { name } = req.params;
//     try {
//         const girlGroups = await getGirlGroupByName(name);
//         if (girlGroups.length === 0) {
//             return res.status(404).json({ message: 'Girl Group Not Found.' });
//         }
//         return res.json({ girlGroups });
//     } catch (error) {
//         return next(error);
//     }
// });

// router.get('/api/videos', async (req, res, next) => {
//     try {
//         const videos = await getAllVideos();
//         return res.json({ videos });
//     } catch (error) {
//         return next(error);
//     }
// });

// router.get('/api/videos/:searchTerm', async (req, res, next) => {
//     try {
//         const { searchTerm } = req.params;

//         // Search videos by artist or song name
//         const videos = await searchVideos(searchTerm);

//         if (videos.length === 0) {
//             return res.status(404).json({ error: 'No videos found for the provided search term' });
//         }

//         return res.json({ videos });
//     } catch (error) {
//         return next(error);
//     }
// });

// // Updated register route
// router.post('/api/register', async (req, res) => {
//     const { username, email, password, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song } = req.body;

//     try {
//         // Call the register function to register the user
//         const userId = await register(username, email, password, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song);

//         // Respond with success message and user ID
//         res.status(201).json({ message: `${username} registered successfully`, userId });
//     } catch (error) {
//         if (error.message === 'Username already taken. Please choose another Username.') {
//             // Custom error message for duplicate username
//             res.status(400).json({ error: 'Username already taken. Please choose another Username.' });
//         } else {
//             // Other errors are treated as server errors
//             res.status(500).json({ error: 'An error occurred while registering user' });
//         }
//     }
// });

// // Login route

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


// router.get('/api/users/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         if (!userId) {
//             return res.status(400).json({ error: 'User ID is missing' });
//         }

//         // Call the getUserById function to retrieve the user
//         const user = await getUserById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Respond with the user object
//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error retrieving user by ID:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// const { getAllUsers } = require('./models/usersModel');


// //GET route to fetch information for all users
// router.get('/api/users', async (req, res) => {
//     try {
//         // Fetch information for all users from the database
//         const users = await getAllUsers();

//         // Respond with the user information
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching user information:', error);
//         res.status(500).json({ error: 'An error occurred while fetching user information' });
//     }
// });





// // PATCH route to update user profile
// router.patch('/api/users/:userId', authenticateJWT, async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const updates = req.body;

//         // Call the updateUserProfile function to update the user profile
//         const message = await updateUserProfile(userId, updates);

//         // Respond with success message
//         res.status(200).json({ message });
//     } catch (error) {
//         // Handle errors
//         if (error.message === 'unauthorized') {
//             res.status(401).json({ error: 'Unauthorized! Must login to edit profile.' });
//         } else {
//             console.error('Error updating user profile:', error);
//             res.status(500).json({ error: 'Error updating user profile' });
//         }
//     }
// });


// // Route for deleting a user
// router.delete('/api/delete', async (req, res) => {
//     const { token } = req.body;

//     try {
//         // Verify and decode the JWT token
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const username = decoded.username;

//         // Call the delete function to delete the user
//         await deleteUser(username);

//         // Respond with success message
//         res.status(200).json({ message: `${username}'s profile was deleted successfully` });
//     } catch (error) {
//         // Handle token verification errors or deletion errors
//         console.error('Error deleting user profile:', error);
//         res.status(500).json({ error: 'Error deleting user profile' });
//     }
// });


// module.exports = router;

// const express = require('express');
// const idolRoutes = require('./routes/idolRoutes');
// const groupRoutes = require('./routes/groupRoutes');
// const videoRoutes = require('./routes/videoRoutes');
// const userRoutes = require('./routes/userRoutes');

// const router = express.Router();

// router.use('/api/idols', idolRoutes);
// router.use('/api/groups', groupRoutes);
// router.use('/api/videos', videoRoutes);
// router.use('/api/users', userRoutes);

// module.exports = router;
