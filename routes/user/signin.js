const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../db.js');

const router = express.Router();

router.get('/',async(req,res)=> {
    res.json({message: "signin"});
    })

// Signin Route
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Find the user by username or email
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username || null, email || null]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        
        res.status(200).json({ message: 'Signin successful'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
