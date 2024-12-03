const express = require('express');
const pool = require('../../db.js'); // Database connection
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const query = `SELECT id, username, email, role, first_name, last_name, contact_info, joined_date, status FROM users;`;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;