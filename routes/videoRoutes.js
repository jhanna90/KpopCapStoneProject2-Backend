const express = require('express');
const router = express.Router();
const { getAllVideos, searchVideos, addVideo } = require('../models/videoModel');

router.get('/api/videos', async (req, res, next) => {
    try {
        const videos = await getAllVideos();
        return res.json({ videos });
    } catch (error) {
        return next(error);
    }
});

router.get('/api/videos/:searchTerm', async (req, res, next) => {
    try {
        const { searchTerm } = req.params;

        // Search videos by artist or song name
        const videos = await searchVideos(searchTerm);

        if (videos.length === 0) {
            return res.status(404).json({ error: 'Sorry! Video not found 😢. Would you like to add it?' });
        }

        return res.json({ videos });
    } catch (error) {
        return next(error);
    }
});

router.post('/api/videos', async (req, res, next) => {
    try {
        const { artist, video, song_name, korean_name, release_date, director } = req.body;

        // Call the function to add the video to the database
        await addVideo(artist, video, song_name, korean_name, release_date, director);

        // Return success message
        res.status(201).json({ message: 'Video added successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
