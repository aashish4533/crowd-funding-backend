const express = require('express');
const router = express.Router();
const db = require('../../db.js');

// Fetch all rewards for a campaign
router.get('/:campaignID', async (req, res) => {
    try {
        const campaignID = req.params.campaignID;
        const [rewards] = await db.execute('SELECT * FROM Reward WHERE campaignID = ?', [campaignID]);
        res.json(rewards);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rewards.' });
    }
});

// Create a reward for a campaign
router.post('/', async (req, res) => {
    const { campaignID, rewardDescription, minDonationAmount, deliveryDate } = req.body;
    try {
        await db.execute(
            'INSERT INTO Reward (campaignID, rewardDescription, minDonationAmount, deliveryDate) VALUES (?, ?, ?, ?)',
            [campaignID, rewardDescription, minDonationAmount, deliveryDate]
        );
        res.status(201).json({ message: 'Reward created successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create reward.' });
    }
});

module.exports = router;
