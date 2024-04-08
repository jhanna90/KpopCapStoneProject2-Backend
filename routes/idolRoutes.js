const express = require('express');
const router = express.Router();
const { getKpopIdols, getKpopIdolByName, addKpopIdol, updateKpopIdol } = require('../models/idolModel');


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
            return res.status(404).json({ message: 'Idol not found. Would you like to them?' });
        }
        return res.json({ idols });
    } catch (error) {
        return next(error);
    }
});

// POST route to add a new idol
router.post('/api/idols', async (req, res, next) => {
    try {
        // Get the idol data from the request body
        const { stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender } = req.body;

        // Call the function to add the idol to the database
        await addKpopIdol(stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender);

        // Return success message
        res.status(201).json({ message: 'Idol added successfully' });
    } catch (error) {
        next(error);
    }
});

// PATCH route to update idol profile
router.patch('/api/idols/:name', async (req, res) => {
    try {
        // Extract idol name from the request parameters
        const idolName = req.params.name;

        // Extract updates from the request body
        const updates = req.body;

        // Call the updateKpopIdol function to update the idol profile
        const message = await updateKpopIdol(idolName, updates);

        // Respond with success message
        res.status(200).json({ message });
    } catch (error) {
        console.error('Error updating idol profile:', error);
        res.status(500).json({ error: 'Error updating idol profile' });
    }
});



module.exports = router;