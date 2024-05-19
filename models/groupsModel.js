const db = require('../db'); // Assuming your db.js file is located in the parent directory

async function getBoyGroups() {
    const query = 'SELECT * FROM boy_groups';
    const { rows } = await db.query(query);
    return rows;
}

async function getBoyGroupByName(groupName) {
    const query = 'SELECT * FROM boy_groups WHERE LOWER(group_name) LIKE LOWER($1)';
    const params = [`%${groupName}%`];
    const { rows } = await db.query(query, params);
    return rows;
}

async function getGirlGroups() {
    const query = 'SELECT * FROM girl_groups';
    const { rows } = await db.query(query);
    return rows;
}

async function getGirlGroupByName(groupName) {
    const query = 'SELECT * FROM girl_groups WHERE LOWER(group_name) LIKE LOWER($1)';
    const params = [`%${groupName}%`];
    const { rows } = await db.query(query, params);
    return rows;
}

async function getGroupTypeByName(groupName) {
    try {
        const query = 'SELECT group_type FROM boy_groups WHERE LOWER(group_name) = LOWER($1) UNION ALL SELECT group_type FROM girl_groups WHERE LOWER(group_name) = LOWER($1)';
        const params = [groupName];
        const { rows } = await db.query(query, params);
        return rows[0] ? rows[0].group_type : null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getBoyGroups,
    getBoyGroupByName,
    getGirlGroups,
    getGirlGroupByName,
    getGroupTypeByName
};
