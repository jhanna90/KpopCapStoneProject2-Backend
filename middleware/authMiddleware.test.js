const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../middleware/authMiddleware');
const { SECRET_KEY } = require('../config');

describe('authenticateJWT Middleware', () => {
    const app = express();
    app.use(express.json());

    // A sample protected route for testing
    app.get('/protected', authenticateJWT, (req, res) => {
        res.json({ message: 'Protected route accessed', user: req.user });
    });

    it('should allow access with a valid token', async () => {
        const token = jwt.sign({ username: 'testuser' }, SECRET_KEY);

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Protected route accessed');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('username', 'testuser');
    });

    it('should deny access with an invalid token', async () => {
        const invalidToken = 'invalidtoken';

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Unauthorized: Invalid token');
    });

    it('should deny access when token is missing', async () => {
        const response = await request(app)
            .get('/protected');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Unauthorized: Invalid token');
    });
});
