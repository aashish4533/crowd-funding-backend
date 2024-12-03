// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DB_URL,     
    ssl: {
        rejectUnauthorized: false // Accept SSL certificates (if not self-signed)
    }          // e.g., 5432
});

// Function to check the database connection
pool.connect()
    .then(client => {
        console.log("Connected to PostgreSQL Database");
        client.release(); // Release the client back to the pool
    })
    .catch(err => {
        console.error("Database connection error:", err.stack);
    });

// Export the pool to use in other files
module.exports = pool;
