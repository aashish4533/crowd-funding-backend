const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../../db');

const createCampaign = async (req, res) => {
  const {
    Title,
    Description,
    GoalAmount,
    Category,
    StartDate,
    EndDate,
  } = req.body;

  // Validate input fields
  if (!Title || !Description || !GoalAmount || !Category || !StartDate || !EndDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Generate CampaignID using JWT
    const CampaignID = jwt.sign(
      { title: Title, timestamp: Date.now() },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // SQL query to insert data into the Campaign table
    const query = `
      INSERT INTO campaign (
        CampaignID, Title, Description, GoalAmount, CurrentAmount, 
        Category, Status, StartDate, EndDate
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      CampaignID,
      Title,
      Description,
      GoalAmount,
      0,
      Category,
      'Active', 
      StartDate,
      EndDate,
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({ 
      message: 'Campaign created successfully', 
      campaign: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = createCampaign;
