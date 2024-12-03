const express = require('express');
const db = require('../../db.js'); 
const router = express.Router();


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Campaign WHERE CampaignID = ?;`;

    try {
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Campaign deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Campaign not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the campaign.' });
    }
});

module.exports = router;
