const { Pool } = require("pg");
// this is testinghttps://fakerjs.dev/api/internet.html#username
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:messi3214@localhost:5432/esports";

const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
