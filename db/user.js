const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ username, password, email, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, email, "isAdmin")
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username, email) DO NOTHING
    RETURNING *;
    `,
      [username, hashedPassword, email, isAdmin]
    );

    if (user) {
      delete user.password;

      return user;
    } else {
      throw new Error("User creation failed. Possibly a duplicate username.");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT users.*
      FROM users;
      `
    );

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!isValid) {
    throw Error;
  } else {
    delete user.password;
    return user;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
    `,
      [userId]
    );
    if (!user) {
      return null;
    } else {
      delete user.password;
    }

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
    WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
}

async function updateUser({ username, password, email, isAdmin }) {
  try {
    const {
      rows: [updatedUser],
    } = await client.query(
      `
      UPDATE users
      SET "username" = $1, "password" = $2, "email" = $3, AND "isAdmin" = $4
      RETURNING *;
      `,
      [username, password, email, isAdmin]
    );

    if (!updatedUser) {
      throw Error;
    } else {
      return updatedUser;
    }
  } catch (error) {
    console.error(error);
  }
}

async function destroyUser(id) {
  try {
    await client.query(
      `
      DELETE FROM reviews
      WHERE id=$1
      RETURNING *;
      `,
      [id]
    );
    await client.query(
      `
      DELETE FROM orders
      WHERE id=$1
      RETURNING *;
      `,
      [id]
    );
    const {
      rows: [deleteUser],
    } = await client.query(
      `
      DELETE FROM users
      WHERE id=$1
      RETURNING *;
      `,
      [id]
    );

    if (!deleteUser) {
      throw Error;
    } else {
      return deleteUser;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByUsername,
  getUserById,
  updateUser,
  destroyUser,
};
