const { Pool } = require("pg");
const { localHostConnection } = require('../localhostconnect.js')

const connectionString = localHostConnection || process.env.DATABASE_URL ;

const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
