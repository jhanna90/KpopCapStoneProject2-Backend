// /** Database for kpop explorer*/

const { Pool } = require('pg');
const config = require('./config'); // Assuming your config file is in the same directory

// Create a new Pool instance with database connection details from config.js
const pool = new Pool({
    connectionString: config.getDatabaseUri(),
});

// Query function to execute SQL queries
const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query:', { text, duration, rows: res.rowCount });
    return res;
};

module.exports = { pool, query };
