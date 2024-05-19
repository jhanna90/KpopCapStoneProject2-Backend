const request = require('supertest');
const express = require('express');
const videoRoutes = require('../routes/videoRoutes'); // Adjust the path as necessary
const { getAllVideos, searchVideos, addVideo } = require('../models/videoModel');

// Mock the video model functions
jest.mock('../models/videoModel', () => ({
    getAllVideos: jest.fn(),
    searchVideos: jest.fn(),
    addVideo: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(videoRoutes);

describe('Video Routes', () => {
    describe('GET /api/videos', () => {
        it('should return all videos', async () => {
            const mockVideos = [{ id: 1, title: 'Test Video' }];
            getAllVideos.mockResolvedValue(mockVideos);

            const response = await request(app).get('/api/videos');

            expect(response.status).toBe(200);
            expect(response.body.videos).toEqual(mockVideos);
        });
    });

    describe('GET /api/videos/:searchTerm', () => {
        it('should return videos matching the search term', async () => {
            const mockVideos = [{ id: 1, title: 'Test Video' }];
            searchVideos.mockResolvedValue(mockVideos);

            const response = await request(app).get('/api/videos/test');

            expect(response.status).toBe(200);
            expect(response.body.videos).toEqual(mockVideos);
        });

        it('should return 404 if no videos found', async () => {
            searchVideos.mockResolvedValue([]);

            const response = await request(app).get('/api/videos/nonexistent');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Sorry! Video not found 😢. Would you like to add it?');
        });
    });

    describe('POST /api/videos', () => {
        it('should add a new video', async () => {
            addVideo.mockResolvedValue();

            const newVideo = {
                artist: 'Test Artist',
                video: 'Test Video URL',
                song_name: 'Test Song',
                korean_name: '테스트 송',
                release_date: '2024-05-17',
                director: 'Test Director',
            };

            const response = await request(app)
                .post('/api/videos')
                .send(newVideo);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Video added successfully');
        });
    });
});
