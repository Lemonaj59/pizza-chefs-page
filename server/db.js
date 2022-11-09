const { Pool } = require("pg");

let client = new Pool({
  connectionURL: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = client;

