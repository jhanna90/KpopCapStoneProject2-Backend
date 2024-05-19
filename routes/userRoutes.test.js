const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const userRoutes = require('../routes/userRoutes'); // Adjust the path as necessary
const { register, login, updateUserProfile, deleteUser, getUserByUsername } = require('../models/usersModel');
const { SECRET_KEY } = require('../config');

// Mock the user model functions
jest.mock('../models/usersModel', () => ({
    register: jest.fn(),
    login: jest.fn(),
    updateUserProfile: jest.fn(),
    deleteUser: jest.fn(),
    getUserByUsername: jest.fn(),
}));

// Create a test Express app and use the routes
const app = express();
app.use(express.json());
app.use(userRoutes);

describe('User Routes', () => {
    describe('POST /api/register', () => {
        it('should register a new user', async () => {
            const mockUserId = 1;
            register.mockResolvedValue(mockUserId);

            const newUser = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fav_boy_group: 'BTS',
                fav_girl_group: 'BLACKPINK',
                bias: 'V',
                alt_bias: 'Jungkook',
                bias_wrecker: 'Suga',
                fav_girl_group_song: 'DDU-DU DDU-DU',
                fav_boy_group_song: 'Dynamite'
            };

            const response = await request(app)
                .post('/api/register')
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', `${newUser.username} registered successfully`);
            expect(response.body).toHaveProperty('userId', mockUserId);
        });

        it('should handle duplicate username error', async () => {
            register.mockRejectedValue(new Error('Username already taken. Please choose another Username.'));

            const newUser = {
                username: 'duplicateuser',
                email: 'test@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/register')
                .send(newUser);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Username already taken. Please choose another Username.');
        });
    });

    describe('POST /api/login', () => {
        it('should login a user and return a token', async () => {
            const mockToken = 'mockToken';
            login.mockResolvedValue({ message: 'Login successful', token: mockToken });

            const credentials = { username: 'testuser', password: 'password123' };

            const response = await request(app)
                .post('/api/login')
                .send(credentials);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Login successful');
            expect(response.body).toHaveProperty('token', mockToken);
            expect(response.body).toHaveProperty('username', credentials.username);
        });

        it('should handle invalid credentials error', async () => {
            login.mockRejectedValue(new Error('Invalid username or password'));

            const credentials = { username: 'invaliduser', password: 'wrongpassword' };

            const response = await request(app)
                .post('/api/login')
                .send(credentials);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid username or password');
        });
    });

    describe('GET /api/users/profile/:username', () => {
        it('should return user profile if authenticated', async () => {
            const mockUser = { username: 'testuser', email: 'test@example.com' };
            getUserByUsername.mockResolvedValue(mockUser);

            const token = jwt.sign({ username: 'testuser' }, SECRET_KEY);

            const response = await request(app)
                .get('/api/users/profile/testuser')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        it('should return 404 if user not found', async () => {
            getUserByUsername.mockResolvedValue(null);

            const token = jwt.sign({ username: 'testuser' }, SECRET_KEY);

            const response = await request(app)
                .get('/api/users/profile/nonexistentuser')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe('PATCH /api/users/:username', () => {
        it('should update user profile if authenticated', async () => {
            updateUserProfile.mockResolvedValue('Profile updated successfully!');

            const updates = { email: 'newemail@example.com' };
            const token = jwt.sign({ username: 'testuser' }, SECRET_KEY);

            const response = await request(app)
                .patch('/api/users/testuser')
                .set('Authorization', `Bearer ${token}`)
                .send(updates);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Profile updated successfully!');
        });

        it('should return 401 if username does not match token', async () => {
            const updates = { email: 'newemail@example.com' };
            const token = jwt.sign({ username: 'anotheruser' }, SECRET_KEY);

            const response = await request(app)
                .patch('/api/users/testuser')
                .set('Authorization', `Bearer ${token}`)
                .send(updates);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Unauthorized! Must login to edit profile.');
        });
    });

    describe('DELETE /api/users/:username', () => {
        it('should delete user profile if authenticated', async () => {
            deleteUser.mockResolvedValue();

            const token = jwt.sign({ username: 'testuser' }, SECRET_KEY);

            const response = await request(app)
                .delete('/api/users/testuser')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'User profile deleted successfully');
        });

        it('should handle errors during deletion', async () => {
            deleteUser.mockRejectedValue(new Error('An error occurred while deleting user profile'));

            const token = jwt.sign({ username: 'testuser' }, SECRET_KEY);

            const response = await request(app)
                .delete('/api/users/testuser')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'An error occurred while deleting user profile');
        });
    });
});


