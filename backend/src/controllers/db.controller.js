// Database connection and variables controller
const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT,
    connectionTimeoutMillis: 10000,
});

module.exports = pool;