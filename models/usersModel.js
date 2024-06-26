const db = require('../db');
const { SECRET_KEY } = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ExpressError } = require('../expressError');

// Updated register function
async function register(username, email, password, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Using salt rounds of 10

        // Insert the new user into the database
        const query = `
            INSERT INTO users (username, email, password, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id;`;

        const result = await db.query(query, [username, email, hashedPassword, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song]);
        const userId = result.rows[0].id;

        // Return the ID of the newly registered user
        return userId;
    } catch (error) {
        if (error.code === '23505') {
            // Unique constraint violation error (username already exists)
            throw new Error('Username already taken. Please choose another Username.');
        }
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login function
async function login(username, password) {
    try {
        // Retrieve the user from the database by username
        const query = `
            SELECT id, password
            FROM users
            WHERE username = $1;`;

        const result = await db.query(query, [username]);

        if (result.rows.length === 0) {
            throw new Error('Invalid username or password');
        }

        const { id, password: hashedPassword } = result.rows[0];

        // Compare the provided password with the hashed password from the database
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        // Generate JWT token with user ID and username
        const token = jwt.sign({ userId: id, username }, SECRET_KEY);
        return { message: 'Logged in successfully', userId: id, token };
    } catch (error) {
        throw error;
    }
}

// Function to retrieve user by username
async function getUserByUsername(username) {
    try {
        // Retrieve the user from the database by username
        const query = `
            SELECT id, username, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song
            FROM users
            WHERE username = $1;`;

        const result = await db.query(query, [username]);

        if (result.rows.length === 0) {
            return null; // Return null if user not found
        }

        return result.rows[0]; // Return the user object
    } catch (error) {
        console.error('Error getting user by username:', error);
        throw error;
    }
}

// Function to fetch information for all users from the database
async function getAllUsers() {
    try {
        const query = `
            SELECT id, username, fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song
            FROM users`;

        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

async function updateUserProfile(username, updates) {
    try {

        // Extract the profile updates from the updates object
        const { fav_boy_group, fav_girl_group, bias, alt_bias, bias_wrecker, fav_girl_group_song, fav_boy_group_song } = updates;

        // Construct the UPDATE query based on the provided updates
        let query = 'UPDATE users SET';
        const values = [];
        let index = 1;

        // Add each field to the query if it exists in the updates object
        if (fav_boy_group !== undefined) {
            query += ` fav_boy_group = $${index},`;
            values.push(fav_boy_group);
            index++;
        }
        if (fav_girl_group !== undefined) {
            query += ` fav_girl_group = $${index},`;
            values.push(fav_girl_group);
            index++;
        }
        if (bias !== undefined) {
            query += ` bias = $${index},`;
            values.push(bias);
            index++;
        }
        if (alt_bias !== undefined) {
            query += ` alt_bias = $${index},`;
            values.push(alt_bias);
            index++;
        }
        if (bias_wrecker !== undefined) {
            query += ` bias_wrecker = $${index},`;
            values.push(bias_wrecker);
            index++;
        }
        if (fav_girl_group_song !== undefined) {
            query += ` fav_girl_group_song = $${index},`;
            values.push(fav_girl_group_song);
            index++;
        }
        if (fav_boy_group_song !== undefined) {
            query += ` fav_boy_group_song = $${index},`;
            values.push(fav_boy_group_song);
            index++;
        }

        // Remove the trailing comma from the query
        query = query.slice(0, -1);

        // Add the WHERE clause to the query
        query += ' WHERE username = $' + index;
        values.push(username);

        // Execute the UPDATE query with the provided updates and username
        await db.query(query, values);

        return 'Profile updated successfully'; // Return a success message
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

async function deleteUser(username, authenticatedUser) {
    try {
        // Check if the authenticated user matches the user associated with the account being deleted
        if (username !== authenticatedUser.username) {
            throw new ExpressError('Unauthorized: You are not authorized to delete this account', 403);
        }

        const query = `
            DELETE FROM users
            WHERE username = $1;`;

        await db.query(query, [username]);
        // Optionally, perform any additional cleanup or related actions

        return true; // Indicate successful deletion
    } catch (error) {
        // If it's not an instance of ExpressError, wrap it in one
        if (!(error instanceof ExpressError)) {
            throw new ExpressError('An error occurred while deleting user profile', 500);
        }
        throw error;
    }
}

module.exports = {
    register,
    login,
    getAllUsers,
    deleteUser,
    updateUserProfile,
    getUserByUsername
};