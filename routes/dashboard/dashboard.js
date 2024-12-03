const express = require('express');
const pool = require('../../db.js'); 
const router = express.Router();

// Route to fetch all campaigns
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM campaign ORDER BY StartDate DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
});

module.exports = router;