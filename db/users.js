const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email, isAdmin }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, email, "isAdmin")
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, hashedPassword, email, isAdmin]
    );
    console.log({ username, password, email, isAdmin });
    if (user) {
      delete user.password;
      console.log("created USER..", user, hashedPassword);
      return user;
    } else {
      throw new Error("User creation failed. Possibly a duplicate username.");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!isValid) {
    return false;
  } else {
    delete user.password;
    return user;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT id, username, password
    FROM users
    WHERE id=${userId}
    `);
    if (!user) {
      return null;
    } else {
      delete user.password;
    }
    console.log("TESTTT", user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username =$1;
    `[username]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
};
