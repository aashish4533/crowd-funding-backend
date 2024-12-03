const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../db.js');
const { generateToken } = require('../../utils/jwt.js');

const router = express.Router();

router.get('/',async(req,res)=> {
res.json({message: "signup"});
})

// Signup Route
router.post('/', async (req, res) => {
    const { username, password, email, role, first_name, last_name, contact_info } = req.body;

    try {
        // Check if the user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const result = await pool.query(
            `INSERT INTO users (username, password, email, role, first_name, last_name, contact_info) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [username, hashedPassword, email, role, first_name, last_name, contact_info]
        );

        // Generate JWT token
        const token = generateToken({ id: result.rows[0].id, username, role });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
