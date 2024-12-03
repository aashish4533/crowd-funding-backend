const express = require('express');
const router = express.Router();
const db = require('../../db.js');

// Fetch user rewards
router.get('/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const [userRewards] = await db.execute(
            `SELECT ur.*, r.rewardDescription, r.minDonationAmount 
             FROM UserReward ur
             JOIN Reward r ON ur.rewardID = r.rewardID
             WHERE ur.userID = ?`,
            [userID]
        );
        res.json(userRewards);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user rewards.' });
    }
});

// Claim a reward
router.post('/', async (req, res) => {
    const { userID, rewardID } = req.body;
    try {
        await db.execute(
            'INSERT INTO UserReward (userID, rewardID) VALUES (?, ?)',
            [userID, rewardID]
        );
        res.status(201).json({ message: 'Reward claimed successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to claim reward.' });
    }
});

module.exports = router;
