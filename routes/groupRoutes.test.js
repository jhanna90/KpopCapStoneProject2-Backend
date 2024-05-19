const request = require('supertest');
const express = require('express');
const groupRoutes = require('../routes/groupRoutes'); // Adjust the path as necessary
const {
    getBoyGroups,
    getBoyGroupByName,
    getGirlGroups,
    getGirlGroupByName
} = require('../models/groupsModel');

// Mock the groups model functions
jest.mock('../models/groupsModel', () => ({
    getBoyGroups: jest.fn(),
    getBoyGroupByName: jest.fn(),
    getGirlGroups: jest.fn(),
    getGirlGroupByName: jest.fn(),
}));

// Create a test Express app and use the routes
const app = express();
app.use(express.json());
app.use(groupRoutes);

describe('Group Routes', () => {
    describe('GET /api/boy-groups', () => {
        it('should return all boy groups', async () => {
            const mockBoyGroups = [
                { group_name: 'Boy Group 1' },
                { group_name: 'Boy Group 2' },
            ];
            getBoyGroups.mockResolvedValue(mockBoyGroups);

            const response = await request(app).get('/api/boy-groups');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('boyGroups', mockBoyGroups);
        });

        it('should handle errors', async () => {
            getBoyGroups.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/boy-groups');

            expect(response.status).toBe(500);
        });
    });

    describe('GET /api/boy-groups/:name', () => {
        it('should return the boy group by name', async () => {
            const mockBoyGroup = { group_name: 'Boy Group 1' };
            getBoyGroupByName.mockResolvedValue([mockBoyGroup]);

            const response = await request(app).get('/api/boy-groups/Boy Group 1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('boyGroups', [mockBoyGroup]);
        });

        it('should return 404 if boy group not found', async () => {
            getBoyGroupByName.mockResolvedValue([]);

            const response = await request(app).get('/api/boy-groups/Unknown Group');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Boy Group Not Found.');
        });
    });

    describe('GET /api/girl-groups', () => {
        it('should return all girl groups', async () => {
            const mockGirlGroups = [
                { group_name: 'Girl Group 1' },
                { group_name: 'Girl Group 2' },
            ];
            getGirlGroups.mockResolvedValue(mockGirlGroups);

            const response = await request(app).get('/api/girl-groups');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('girlGroups', mockGirlGroups);
        });

        it('should handle errors', async () => {
            getGirlGroups.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/girl-groups');

            expect(response.status).toBe(500);
        });
    });

    describe('GET /api/girl-groups/:name', () => {
        it('should return the girl group by name', async () => {
            const mockGirlGroup = { group_name: 'Girl Group 1' };
            getGirlGroupByName.mockResolvedValue([mockGirlGroup]);

            const response = await request(app).get('/api/girl-groups/Girl Group 1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('girlGroups', [mockGirlGroup]);
        });

        it('should return 404 if girl group not found', async () => {
            getGirlGroupByName.mockResolvedValue([]);

            const response = await request(app).get('/api/girl-groups/Unknown Group');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Girl Group Not Found.');
        });
    });

    describe('GET /api/groups', () => {
        it('should return all groups sorted alphabetically', async () => {
            const mockBoyGroups = [
                { group_name: 'Boy Group B' },
                { group_name: 'Boy Group A' },
            ];
            const mockGirlGroups = [
                { group_name: 'Girl Group B' },
                { group_name: 'Girl Group A' },
            ];
            getBoyGroups.mockResolvedValue(mockBoyGroups);
            getGirlGroups.mockResolvedValue(mockGirlGroups);

            const response = await request(app).get('/api/groups');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('allGroups');
            expect(response.body.allGroups).toEqual([
                { group_name: 'Boy Group A' },
                { group_name: 'Boy Group B' },
                { group_name: 'Girl Group A' },
                { group_name: 'Girl Group B' },
            ]);
        });

        it('should handle errors', async () => {
            getBoyGroups.mockRejectedValue(new Error('Database error'));
            getGirlGroups.mockResolvedValue([]);

            const response = await request(app).get('/api/groups');

            expect(response.status).toBe(500);
        });
    });

    describe('GET /api/groups/:name', () => {
        it('should return the group by name', async () => {
            const mockBoyGroup = { group_name: 'Boy Group 1' };
            const mockGirlGroup = { group_name: 'Girl Group 1' };
            getBoyGroupByName.mockResolvedValue([mockBoyGroup]);
            getGirlGroupByName.mockResolvedValue([mockGirlGroup]);

            const response = await request(app).get('/api/groups/Group 1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('allGroups', [mockBoyGroup, mockGirlGroup]);
        });

        it('should return 404 if group not found', async () => {
            getBoyGroupByName.mockResolvedValue([]);
            getGirlGroupByName.mockResolvedValue([]);

            const response = await request(app).get('/api/groups/Unknown Group');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Group Not Found.');
        });
    });
});
