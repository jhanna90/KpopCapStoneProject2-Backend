const db = require('../db');

async function getAllVideos() {
    const query = 'SELECT * FROM videos';
    const { rows } = await db.query(query);
    return rows;
}

async function searchVideos(searchTerm) {
    let query = `SELECT artist, video, song_name, korean_name, release_date, director 
    FROM videos WHERE artist ILIKE $1 OR song_name ILIKE $1`;

    const { rows } = await db.query(query, [`%${searchTerm}%`]);
    return rows;
}

async function addVideo(artist, video, song_name, korean_name, release_date, director) {
    try {
        const query = `
            INSERT INTO videos (artist, video, song_name, korean_name, release_date, director)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await db.query(query, [artist, video, song_name, korean_name, release_date, director]);
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllVideos, searchVideos, addVideo };

