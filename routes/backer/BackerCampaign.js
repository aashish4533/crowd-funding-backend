const express = require('express');
const pool = require('../../db.js'); 
const router = express.Router();


router.post('/', async (req, res) => {
    const { firstName, lastName, Title, amountDonated } = req.body;

    if (!firstName || !lastName || !Title || !amountDonated) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO BackerCampaign (firstName, lastName, campaignID, amountDonated)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const values = [firstName, lastName, Title, amountDonated];
        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Backer Campaign record added successfully',
            backerCampaign: result.rows[0],
        });
    } catch (error) {
        console.error('Error adding backer campaign:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM BackerCampaign;`;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching backer campaigns:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
