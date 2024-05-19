const express = require('express');
const router = express.Router();
const {
    getBoyGroups,
    getBoyGroupByName,
    getGirlGroups,
    getGirlGroupByName
} = require('../models/groupsModel');

// Route to get all boy groups
router.get('/api/boy-groups', async (req, res, next) => {
    try {
        const boyGroups = await getBoyGroups();
        return res.json({ boyGroups });
    } catch (error) {
        return next(error);
    }
});

// Route to search for boy groups by name
router.get('/api/boy-groups/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const boyGroups = await getBoyGroupByName(name);
        if (boyGroups.length === 0) {
            return res.status(404).json({ message: 'Boy Group Not Found.' });
        }
        return res.json({ boyGroups });
    } catch (error) {
        return next(error);
    }
});

// Route to get all girl groups
router.get('/api/girl-groups', async (req, res, next) => {
    try {
        const girlGroups = await getGirlGroups();
        return res.json({ girlGroups });
    } catch (error) {
        return next(error);
    }
});

// Route to search for girl groups by name
router.get('/api/girl-groups/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const girlGroups = await getGirlGroupByName(name);
        if (girlGroups.length === 0) {
            return res.status(404).json({ message: 'Girl Group Not Found.' });
        }
        return res.json({ girlGroups });
    } catch (error) {
        return next(error);
    }
});

// Route to get all groups in alphabetical order
router.get('/api/groups', async (req, res, next) => {
    try {
        // Get all boy groups and girl groups
        const boyGroups = await getBoyGroups();
        const girlGroups = await getGirlGroups();

        // Combine both boy and girl groups
        const allGroups = [...boyGroups, ...girlGroups];

        // Sort groups by group_name in alphabetical order
        const sortedGroups = allGroups.sort((a, b) => a.group_name.localeCompare(b.group_name));

        // Return sorted groups
        res.json({ allGroups: sortedGroups });
    } catch (error) {
        next(error);
    }
});

// Route to search for a specific group by name
router.get('/api/groups/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        // Search for the group by name
        const boyGroups = await getBoyGroupByName(name);
        const girlGroups = await getGirlGroupByName(name);

        // Combine results from both boy and girl groups
        const allGroups = [...boyGroups, ...girlGroups];

        if (allGroups.length === 0) {
            return res.status(404).json({ message: 'Group Not Found.' });
        }

        res.json({ allGroups });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
