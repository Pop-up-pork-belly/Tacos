const { createUser } = require("./");
const client = require("./client");
const { faker } = require("@faker-js/faker");

async function createTables() {
  try {
    console.log("building tables...");
    //come back for photos
    // first_name VARCHAR(225) NOT NULL,
    // last_name VARCHAR(225) NOT NULL,
    // email VARCHAR(225) NOT NULL,
    // "isAdmin" BOOLEAN DEFAULT false,
    await client.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(225) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS credit_card(
        cardNumber VARCHAR(16),
        ExpMonth INTEGER,
        ExpYear INTEGER
    );
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(225) NOT NULL,
        price INTEGER,
        "teamId" INTEGER,
        quantity INTEGER
    );
    CREATE TABLE IF NOT EXISTS order_history(
        orderId SERIAL PRIMARY KEY,
        first_name VARCHAR(225),
        last_name VARCHAR(225),
        address VARCHAR(225)
    )
    `);
  } catch (error) {
    console.error(error);
  }
}

async function dropTables() {
  try {
    console.log("Dropping Tables...");
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS credit_card;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS order_history;

        `);
  } catch (error) {
    console.error;
  }
}

async function createInitialUsers() {
  console.log("Creating users....");
  try {
    const usersToCreate = [
      { username: "ed", password: "12312313fafsadfas" },
      { username: "yoo", password: "123adsfasd" },
      { username: "drew", password: "supadfa" },
      { username: "harshil", password: "123asdf" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("users created:");
    console.log(users);
  } catch (error) {
    console.error("error");
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error("Did not work");
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
