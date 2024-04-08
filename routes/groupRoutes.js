const express = require('express');
const router = express.Router();
const {
    getBoyGroups,
    getBoyGroupByName,
    getGirlGroups,
    getGirlGroupByName,
    addKpopGroup,
    updateKpopGroup
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


// POST route to add a new group
router.post('/api/groups', async (req, res, next) => {
    try {
        const { group_name, short, korean_name, debut, company, members, original_memb, fanclub_name, active, group_type } = req.body;

        // Call the function to add the group to the database
        await addKpopGroup(group_name, short, korean_name, debut, company, members, original_memb, fanclub_name, active, group_type);

        // Return success message
        res.status(201).json({ message: 'K-pop group added successfully' });
    } catch (error) {
        next(error);
    }
});

// PATCH route to update group information by name
// router.patch('/api/groups/:name', async (req, res, next) => {
//     const { name } = req.params;
//     const updates = req.body
//     const groupType = determineGroupType(name)

//     try {
//         // Call the function to update the group information
//         await updateKpopGroup(name, { company, members, fanclub_name, active }, group_type);

//         // Return success message
//         res.status(201).json({ message: 'K-pop group information updated successfully' });
//     } catch (error) {
//         console.error("Error updating Kpop group profile", error)
//         next(error);
//     }
// });

// // Route to update K-pop group information
router.patch('/api/groups/:name', async (req, res, next) => {
    const { name } = req.params;
    const updates = req.body;
    try {

        // Call the function to update the K-pop group
        const message = await updateKpopGroup(name, updates);

        // Return a success message
        res.status(200).json({ message });
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});



module.exports = router;
