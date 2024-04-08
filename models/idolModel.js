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

async function getKpopIdolByName(stageName) {
    // Convert both stageName and stage_name to lowercase or uppercase for case-insensitive search
    const query = 'SELECT * FROM idols WHERE LOWER(stage_name) LIKE LOWER($1)';
    const params = [`%${stageName}%`]; // Add wildcards to the parameter
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

async function updateKpopIdol(idolName, updates) {
    try {
        // Extract the profile updates from the updates object
        const { stage_name, full_name, korean_name, k_stage_name, date_of_birth, group_name, country, birthplace, other_group, gender } = updates;

        // Construct the UPDATE query based on the provided updates
        let query = 'UPDATE idols SET';
        const values = [];
        let index = 1;

        // Add each field to the query if it exists in the updates object
        if (stage_name !== undefined) {
            query += ` stage_name = $${index},`;
            values.push(stage_name);
            index++;
        }
        if (full_name !== undefined) {
            query += ` full_name = $${index},`;
            values.push(full_name);
            index++;
        }
        if (korean_name !== undefined) {
            query += ` korean_name = $${index},`;
            values.push(korean_name);
            index++;
        }
        if (k_stage_name !== undefined) {
            query += ` k_stage_name = $${index},`;
            values.push(k_stage_name);
            index++;
        }
        if (date_of_birth !== undefined) {
            query += ` date_of_birth = $${index},`;
            values.push(date_of_birth);
            index++;
        }
        if (group_name !== undefined) {
            query += ` group_name = $${index},`;
            values.push(group_name);
            index++;
        }
        if (country !== undefined) {
            query += ` country = $${index},`;
            values.push(country);
            index++;
        }
        if (birthplace !== undefined) {
            query += ` birthplace = $${index},`;
            values.push(birthplace);
            index++;
        }
        if (other_group !== undefined) {
            query += ` other_group = $${index},`;
            values.push(other_group);
            index++;
        }
        if (gender !== undefined) {
            query += ` gender = $${index},`;
            values.push(gender);
            index++;
        }

        // Remove the trailing comma from the query
        query = query.slice(0, -1);

        // Add the WHERE clause to the query
        query += ' WHERE LOWER(stage_name) = LOWER($' + index + ')';
        values.push(idolName);

        // Execute the UPDATE query with the provided updates and idol name
        await db.query(query, values);

        return 'Idol profile updated successfully'; // Return a success message
    } catch (error) {
        console.error('Error updating idol profile:', error);
        throw error;
    }
}


module.exports = { getKpopIdolByName, getKpopIdols, addKpopIdol, updateKpopIdol };
