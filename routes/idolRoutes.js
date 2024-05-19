const express = require('express');
const router = express.Router();
const { getKpopIdols, getKpopIdolByName, addKpopIdol } = require('../models/idolModel');


// Route to get all K-pop idols ordered alphabetically by stage_name
router.get('/api/idols', async (req, res, next) => {
    try {
        // Call the function to get all idols ordered alphabetically by stage_name
        const idols = await getKpopIdols(req.query);

        // Return the list of idols
        return res.json({ idols });
    } catch (error) {
        return next(error);
    }
});

router.get('/api/idols/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const idols = await getKpopIdolByName(name);
        if (!idols || idols.length === 0) {
            return res.status(404).json({ message: 'Idol not found. Would you like to add them?' });
        }
        return res.json({ idols });
    } catch (error) {
        return next(error);
    }
});

// POST route to add a new idol
router.post('/api/idols', async (req, res, next) => {
    try {
        const { stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender } = req.body;

        const normalizedStageName = stage_name.trim().toLowerCase();
        await addKpopIdol(
            normalizedStageName,
            full_name,
            korean_name,
            k_stage_name,
            date_of_birth,
            group_name,
            country,
            birthplace,
            other_group,
            gender
        );

        res.status(201).json({ message: 'Idol added successfully' });
    } catch (error) {
        console.error('Error adding idol:', error);
        next(error);
    }
});

module.exports = router;