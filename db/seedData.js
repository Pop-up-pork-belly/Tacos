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
        password VARCHAR(225) NOT NULL,
    );
    CREATE TABLE IF NOT EXISTS credit_card(
        cardNumber NVARCHAR(16)
        ExpMonth TINYINT(2),
        ExpYear SMALLINT(4)
    );
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY 
        product_name VARCHAR(225) NOT NULL,
        price INTEGER(4),
        "teamId" INTEGER(99)
        quantity INTEGER(99)
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
        DROP TABLE IF EXIST users;
        DROP TABLE IF EXIST credit_card;
        DROP TABLE IF EXIST products;
        DROP TABLE IF EXIST order_history;

        `);
  } catch (error) {
    console.error;
  }
}

async function createInitialUsers() {
  console.log("Creating users....");
  try {
    const usersToCreate = [
      { username: "ed", password: "123" },
      { username: "yoo", password: "123" },
      { username: "drew", password: "sup" },
      { username: "harshil", password: "123" },
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
