const client = require("./client");
const { faker } = require("@faker-js/faker");
const { createUser } = require("./user");
const { createCategory } = require("./category");
const { createProducts } = require("./product");
const { createReview } = require("./review");
const { createOrder } = require("./order");

async function dropTables() {
  try {
    console.log("Dropping Tables...");
    await client.query(`
    DROP TABLE IF EXISTS carts CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS users;
`);
  } catch (error) {
    console.error("Error dropping tables:", error.message);
  }
}
async function createTables() {
  try {
    console.log("building tables...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(225) NOT NULL,
        password VARCHAR(225) NOT NULL,
        email VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false,
        UNIQUE(username, email)
      );

      CREATE TABLE IF NOT EXISTS categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(225) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        image BYTEA,
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE("categoryId")
      );
        
      CREATE TABLE IF NOT EXISTS reviews(
        id SERIAL PRIMARY KEY,
        rating INTEGER,
        comment TEXT,
        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        UNIQUE("userId", "productId")
      );

      CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        "isComplete" BOOLEAN DEFAULT false,
        total INTEGER NOT NULL,
        order_date DATE DEFAULT CURRENT_DATE,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        UNIQUE("userId", "productId")
      );
            
      CREATE TABLE IF NOT EXISTS orderProducts(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "userId" INTEGER REFERENCES users(id),
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE("userId", "orderId", "productId")
      );

    `);
  } catch (error) {
    console.error(error);
  }
}

async function createInitialUsers() {
  console.log("Creating users....");
  try {
    const usersToCreate = [
      {
        username: "eddiasde",
        password: "12312313fafsadfas",
        email: "ed@ex123afmple.com",
        isAdmin: false,
      },
      {
        username: "yoasdooo",
        password: "123adsfasd",
        email: "ed1a321sdasdf@asdexamfasfpsle.com",
        isAdmin: false,
      },
      {
        username: "d3reasw",
        password: "supadfa",
        email: "ed121233@eadxghample.com",
        isAdmin: false,
      },
      {
        username: "h3arsasdhil",
        password: "123asdf",
        email: "ed12asd33asd@exasmfple.com",
        isAdmin: false,
      },
      {
        username: "TESTUSER1",
        password: "abcd1234",
        email: "testuser1@gmail.com",
        isAdmin: false,
      },
      {
        username: "TESTUSER2",
        password: "abcd1234",
        email: "testuser2@gmail.com",
        isAdmin: true,
      },
    ];
    const newUsers = await Promise.all(usersToCreate.map(createUser));
    console.log("users created:", newUsers);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialProductCategory() {
  console.log("Creating Product_Category...");
  try {
    const productCategoryToCreate = [
      {
        name: "NRG Tenz",
      },
      {
        name: "Cloud9 Tenz",
      },
      {
        name: "Party Tenz",
      },
      {
        name: "Esports Tenz",
      },
      {
        name: "FRENCHFRIES Tenz",
      },
    ];
    const productCategory = await Promise.all(
      productCategoryToCreate.map(createCategory)
    );
    console.log("Product Category created:", productCategory);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialProducts() {
  console.log("Creating Products...");
  try {
    const productsToCreate = [
      {
        name: "NRG Tenz shirt",
        description: "Blahblahblahbalhbalabhlab",
        price: 25,
        quantity: 1,
        image: "https://placehold.co/300x400",
        categoryId: 1,
      },
      {
        name: "Cloud9 shirt",
        description: "djwiladjiwlajdijwaldjwilajdlw",
        price: 20,
        quantity: 1,
        image: "https://placehold.co/600x400",
        categoryId: 2,
      },
      {
        name: "Party shirt",
        description: "SO ON SO FORTH PARTY",
        price: 15,
        quantity: 1,
        image: "https://placehold.co/200x200",
        categoryId: 3,
      },
      {
        name: "Esports shirt",
        description: "HAPPY ESPORTS",
        price: 12,
        quantity: 1,
        image: "https://placehold.co/300x300",
        categoryId: 4,
      },
      {
        name: "FRENCHFRIES shirt",
        description: "FRENCH FRIES",
        price: 30,
        quantity: 1,
        image: "https://placehold.co/600x400",
        categoryId: 5,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProducts));
    console.log("products created:", products);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialReview() {
  console.log("Creating review...");
  try {
    const reviewToCreate = [
      {
        rating: 9,
        comment: "This is an amazing product",
        userId: 1,
        productId: 1,
      },
      {
        rating: 2,
        comment: "This product SUCKS IM SO UPSET",
        userId: 2,
        productId: 2,
      },
      {
        rating: 7,
        comment: "It definitely could be better, but I like it",
        userId: 6,
        productId: 4,
      },
      {
        rating: 9,
        comment: "My store is amazing and so is this product",
        userId: 5,
        productId: 5,
      },
    ];

    const review = await Promise.all(reviewToCreate.map(createReview));
    console.log("Reviewcreated:", review);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialOrder() {
  console.log("Creating Order...");
  try {
    const orderToCreate = [
      {
        isComplete: false,
        total: 50.0,
        userId: 1,
        productId: 1,
      },
      {
        isComplete: true,
        total: 45.0,
        userId: 3,
        productId: 2,
      },
      {
        isComplete: true,
        total: 20.0,
        userId: 6,
        productId: 2,
      },
      {
        isComplete: false,
        total: 50.0,
        userId: 5,
        productId: 2,
      },
    ];

    const order = await Promise.all(orderToCreate.map(createOrder));
    console.log("Order created:", order);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialCart() {
  console.log("Creating Cart...");
  try {
    const cartToCreate = [
      {
        id: 1,
        quantity: 2,
        userId: 1,
        orderId: 1,
        productId: 1,
        productId: 2,
        productId: 4,
      },
      { id: 2, quantity: 3, userId: 3, orderId: 2, productId: 2, productId: 3 },
      { id: 3, quantity: 1, userId: 6, orderId: 3, productId: 2 },
      {
        id: 4,
        quantity: 4,
        userId: 7,
        orderId: 4,
        productId: 2,
        productId: 3,
        productId: 4,
      },
    ];

    const cart = await Promise.all(orderToCreate.map(createCart));
    console.log("Cart created:", cart);
  } catch (error) {
    console.error("error");
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProductCategory();
    await createInitialProducts();
    await createInitialReview();
    await createInitialOrder();
    await createInitialCart();
  } catch (error) {
    console.error("Did not work");
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
