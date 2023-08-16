const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const result = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, hashedPassword]
    );
    const user = result.rows[0];
    delete user.password;
    console.log("created USER...", user, hashedPassword);
    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
};
