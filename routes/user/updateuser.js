const express = require('express');
const pool = require('../../db.js'); // Database connection
const router = express.Router();


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, role, first_name, last_name, contact_info, status } = req.body;

    try {
        const query = `
            UPDATE users
            SET 
                username = $1,
                email = $2,
                role = $3,
                first_name = $4,
                last_name = $5,
                contact_info = $6,
                status = $7
            WHERE id = $8
            RETURNING *;
        `;
        const values = [username, email, role, first_name, last_name, contact_info, status, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: result.rows[0],
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = router;