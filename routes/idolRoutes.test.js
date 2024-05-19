const request = require('supertest');
const express = require('express');
const idolRoutes = require('../routes/idolRoutes'); // Adjust the path as necessary
const { getKpopIdols, getKpopIdolByName, addKpopIdol } = require('../models/idolModel');

// Mock the idol model functions
jest.mock('../models/idolModel', () => ({
    getKpopIdols: jest.fn(),
    getKpopIdolByName: jest.fn(),
    addKpopIdol: jest.fn(),
}));

// Create a test Express app and use the routes
const app = express();
app.use(express.json());
app.use(idolRoutes);

describe('Idol Routes', () => {
    describe('GET /api/idols', () => {
        it('should return all K-pop idols ordered alphabetically by stage_name', async () => {
            const mockIdols = [
                { stage_name: 'A', full_name: 'A' },
                { stage_name: 'B', full_name: 'B' },
            ];
            getKpopIdols.mockResolvedValue(mockIdols);

            const response = await request(app)
                .get('/api/idols');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('idols', mockIdols);
        });

        it('should handle errors', async () => {
            getKpopIdols.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .get('/api/idols');

            expect(response.status).toBe(500);
        });
    });

    describe('GET /api/idols/:name', () => {
        it('should return the idol by name', async () => {
            const mockIdol = { stage_name: 'A', full_name: 'A' };
            getKpopIdolByName.mockResolvedValue([mockIdol]);

            const response = await request(app)
                .get('/api/idols/A');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('idols', [mockIdol]);
        });

        it('should return 404 if idol not found', async () => {
            getKpopIdolByName.mockResolvedValue([]);

            const response = await request(app)
                .get('/api/idols/Unknown');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Idol not found. Would you like to add them?');
        });
    });

    describe('POST /api/idols', () => {
        it('should add a new idol', async () => {
            addKpopIdol.mockResolvedValue();

            const newIdol = {
                stage_name: 'New Idol',
                full_name: 'New Full Name',
                korean_name: 'New Korean Name',
                k_stage_name: 'New K Stage Name',
                date_of_birth: '2000-01-01',
                group_name: 'New Group',
                country: 'New Country',
                birthplace: 'New Birthplace',
                other_group: 'Other Group',
                gender: 'M'
            };

            const response = await request(app)
                .post('/api/idols')
                .send(newIdol);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Idol added successfully');
        });

        it('should handle errors', async () => {
            addKpopIdol.mockRejectedValue(new Error('Database error'));

            const newIdol = {
                stage_name: 'New Idol',
                full_name: 'New Full Name',
                korean_name: 'New Korean Name',
                k_stage_name: 'New K Stage Name',
                date_of_birth: '2000-01-01',
                group_name: 'New Group',
                country: 'New Country',
                birthplace: 'New Birthplace',
                other_group: 'Other Group',
                gender: 'M'
            };

            const response = await request(app)
                .post('/api/idols')
                .send(newIdol);

            expect(response.status).toBe(500);
        });
    });
});
