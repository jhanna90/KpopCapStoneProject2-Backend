const db = require('../db'); // Assuming your db.js file is located in the parent directory

// Function to get all K-pop idols ordered alphabetically by stage_name
async function getKpopIdols(queryParams) {
    let query = 'SELECT * FROM idols';

    // Ordered idols by stage_name
    if (queryParams.orderBy === 'stage_name') {
        query += ' ORDER BY stage_name';
    }

    // Execute the query
    const { rows } = await db.query(query);
    return rows;
}

async function getKpopIdolByName(stage_name) {
    // Convert both stageName and stage_name to lowercase or uppercase for case-insensitive search
    const query = 'SELECT * FROM idols WHERE LOWER(stage_name) LIKE LOWER($1)';
    const params = [`%${stage_name}%`]; // Add wildcards to the parameter
    const { rows } = await db.query(query, params);
    return rows; // Return all matching rows
}

// Function to add a new idol to the database
async function addKpopIdol(stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender) {
    try {
        // Prepare the INSERT query
        const query = `
            INSERT INTO idols (stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        // Execute the query with the provided parameters
        await db.query(query, [stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender]);
    } catch (error) {
        throw error;
    }
}

module.exports = { getKpopIdolByName, getKpopIdols, addKpopIdol};
