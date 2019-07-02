// Database connection and variables controller
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_URL,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port:5432,
    connectionTimeoutMillis: 10000,
});

module.exports = pool;