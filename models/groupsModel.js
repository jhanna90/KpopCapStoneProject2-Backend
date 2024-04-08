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

// Function to add a K-pop group
async function addKpopGroup(group_name, short, korean_name, debut, company, members, original_memb, fanclub_name, active, group_type) {
    try {

        // Construct the query dynamically based on the group type
        const query = `
            INSERT INTO ${group_type}_groups (group_name, short, korean_name, debut, company, members, original_memb, fanclub_name, active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

        // Pass parameters accordingly
        const params = [
            group_name,
            short,
            korean_name,
            debut,
            company,
            members,
            original_memb,
            fanclub_name,
            active
        ];

        await db.query(query, params);
    } catch (error) {
        throw error;
    }
}

// async function updateKpopGroup(groupName, updates, groupType) {
//     try {
//         const { company, members, fanclub_name, active } = updates;

//         const query = `
//             UPDATE ${groupType}_groups
//             SET 
//                 company = $1,
//                 members = $2,
//                 fanclub_name = $3,
//                 active = $4,
//             WHERE LOWER(group_name) = LOWER($5)
//         `;
//         const params = [
//             company,
//             members,
//             fanclub_name,
//             active,
//             groupName
//         ];
//         await db.query(query, params);
//         return 'Kpop Group Updated Successfully';
//     } catch (error) {
//         console.error("Error updating Kpop group profile", error)
//         throw error;
//     }
// }

// Function to update K-pop group information
async function updateKpopGroup(groupName, updates, groupType) {
    try {
        // Extract the updates from the updates object
        const { company, members, fanclub_name, active } = updates;

        // Construct the UPDATE query dynamically based on the provided updates
        let query = `UPDATE ${groupType}_groups SET`;
        const values = [];
        let index = 1;

        // Add each field to the query if it exists in the updates object
        if (company !== undefined) {
            query += ` company = $${index},`;
            values.push(company);
            index++;
        }
        if (members !== undefined) {
            query += ` members = $${index},`;
            values.push(members);
            index++;
        }
        if (fanclub_name !== undefined) {
            query += ` fanclub_name = $${index},`;
            values.push(fanclub_name);
            index++;
        }
        if (active !== undefined) {
            query += ` active = $${index},`;
            values.push(active);
            index++;
        }

        // Remove the trailing comma from the query
        query = query.slice(0, -1);

        // Add the WHERE clause to the query
        query += ' WHERE LOWER (group_name) = LOWER($' + index + ')';
        values.push(groupName);

        // Execute the UPDATE query with the provided updates and group name
        await db.query(query, values);

        // Return a success message
        return 'K-pop group updated successfully';
    } catch (error) {
        console.error('Error updating K-pop group:', error);
        throw error;
    }
}

module.exports = {
    getBoyGroups,
    getBoyGroupByName,
    getGirlGroups,
    getGirlGroupByName,
    addKpopGroup,
    updateKpopGroup
};
