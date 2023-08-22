const { createUser } = require("./");
const client = require("./client");
const { faker } = require("@faker-js/faker");
const { createProducts } = require("./products");
const { createShippingInfo } = require("./shipping");
const { createOrder } = require("./orders");

async function createTables() {
  try {
    console.log("building tables...");

    await client.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(225) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        email VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN
    );
    CREATE TABLE IF NOT EXISTS credit_card(
        id SERIAL PRIMARY KEY,
        cardNumber VARCHAR(16),
        ExpMonth INTEGER,
        ExpYear INTEGER
    );
    CREATE TABLE IF NOT EXISTS product_categories(
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL
  );
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(225) NOT NULL,
        price INTEGER NOT NULL,
        "categoryId" INTEGER REFERENCES product_categories(id),
        image BYTEA,
        quantity INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS carts(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS cart_items(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES carts(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productsId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        total INTEGER NOT NULL,
        order_date DATE DEFAULT CURRENT_DATE
    );
    CREATE TABLE IF NOT EXISTS reviews(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        rating INTEGER,
        comment TEXT,
        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS shipping_info(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        street VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        zip VARCHAR(10),
        country VARCHAR(255)
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
    DROP TABLE IF EXISTS shipping_info CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS carts CASCADE;
    DROP TABLE IF EXISTS cart_items CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS product_categories CASCADE;
    DROP TABLE IF EXISTS credit_card CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
`);
  } catch (error) {
    console.error("Error dropping tables:", error.message);
}
}

async function createInitialUsers() {
  console.log("Creating users....");
  try {
    const usersToCreate = [
      { username: "eddiasde", password: "12312313fafsadfas", email: "ed@ex123afmple.com", isAdmin: false },
      { username: "yoasdooo", password: "123adsfasd", email: "ed1a321sdasdf@asdexamfasfpsle.com", isAdmin: false  },
      { username: "d3reasw", password: "supadfa", email: "ed121233@eadxghample.com", isAdmin: false  },
      { username: "h3arsasdhil", password: "123asdf", email: "ed12asd33asd@exasmfple.com", isAdmin: false  },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("users created:");
    console.log(users);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialProducts() {
  console.log("Creating Products...");
  try {
    const productsToCreate = [
      {product_name: "NRG Tenz shirt", price: 25, image: 'test', quantity: 1 }
    ];
    const products = await Promise.all(productsToCreate.map(createProducts));
    console.log("products created:");
    console.log(products);
  } catch (error) {
    console.error("error");
  }
}
async function createInitialShippingInfo() {
  console.log("Creating ShippingInfo...");
  try {
    const shippingToCreate = [
      { street: "123 W harlem ave", city: "Chicago", state: "IL", zip: "60402", country: "USA"}
    ];
    const shipping = await Promise.all(shippingToCreate.map(createShippingInfo));
    console.log("ShippingInfo created:");
    console.log(shipping);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialOrder() {
  console.log("Creating Order...");
  try {
    const orderToCreate = [
      {"userId": 2, "productsId":1, quantity: 2, total: 100, }
    ];
    const order = await Promise.all(orderToCreate.map(createOrder));
    console.log("Order created:");
    console.log(order);
  } catch (error) {
    console.error("error");
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialShippingInfo();
    await createInitialOrder();
  } catch (error) {
    console.error("Did not work");
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
