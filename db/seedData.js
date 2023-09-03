const { createUser } = require("./users");
const client = require("./client");
const { faker } = require("@faker-js/faker");
const { createProducts } = require("./products");
const { createOrder } = require("./orders");

async function dropTables() {
  try {
    console.log("Dropping Tables...");
    await client.query(`
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS product_categories CASCADE;
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
        username VARCHAR(225) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        email VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false,
        "stripeId" VARCHAR(255) NOT NULL,
        "reviewId" INTEGER REFERENCES reviews(id),
        "orderId" INTEGER REFERENCES orders(id),
        UNIQUE("stripeId", "reviewsId", "ordersId")
      );

      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(225) UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        image BYTEA,
        quantity INTEGER NOT NULL,
        "categoryId" INTEGER REFERENCES product_categories(id),
        "cartId" INTEGER REFERENCES carts(id),
        UNIQUE("categoryId", "cartId")
      );

      CREATE TABLE IF NOT EXISTS product_categories(
        id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) UNIQUE NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        UNIQUE("productId")
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
        UNIQUE("userId", "productsId")
      );
            
      CREATE TABLE IF NOT EXISTS carts(
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
        id: 1,
        username: "eddiasde",
        password: "12312313fafsadfas",
        email: "ed@ex123afmple.com",
        isAdmin: false,
        stripeId: "1",
        reviewsId: 1,
        ordersId: 1,
      },
      {
        username: "eddiasde",
        password: "12312313fafsadfas",
        email: "ed@ex123afmple.com",
        isAdmin: false,
        stripeId: "2",
        reviewsId: 2,
        ordersId: 2,
      },
      {
        username: "yoasdooo",
        password: "123adsfasd",
        email: "ed1a321sdasdf@asdexamfasfpsle.com",
        isAdmin: false,
        stripeId: "3",
        reviewsId: 3,
        ordersId: 3,
      },
      {
        username: "d3reasw",
        password: "supadfa",
        email: "ed121233@eadxghample.com",
        isAdmin: false,
        stripeId: "4",
        reviewsId: 4,
        ordersId: 4,
      },
      {
        username: "h3arsasdhil",
        password: "123asdf",
        email: "ed12asd33asd@exasmfple.com",
        isAdmin: false,
        stripeId: "5",
        reviewsId: 5,
        ordersId: 5,
      },
      {
        username: "TESTUSER1",
        password: "abcd1234",
        email: "testuser1@gmail.com",
        isAdmin: false,
        stripeId: "6",
        reviewsId: 6,
        ordersId: 6,
      },
      {
        username: "TESTUSER2",
        password: "abcd1234",
        email: "testuser2@gmail.com",
        isAdmin: true,
        stripeId: "7",
        reviewsId: 7,
        ordersId: 7,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("users created:", users);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialProducts() {
  console.log("Creating Products...");
  try {
    const productsToCreate = [
      {
        id: 1,
        name: "NRG Tenz shirt",
        price: 25,
        image: "https://placehold.co/300x400",
        quantity: 1,
        cartId: 1,
      },
      {
        id: 2,
        name: "Cloud9 shirt",
        price: 20,
        image: "https://placehold.co/600x400",
        quantity: 1,
        cartId: 2,
      },
      {
        id: 3,
        name: "Party shirt",
        price: 15,
        image: "https://placehold.co/200x200",
        quantity: 1,
        cartId: 1,
      },
      {
        id: 4,
        name: "Esports shirt",
        price: 12,
        image: "https://placehold.co/300x300",
        quantity: 1,
        cartId: 3,
      },
      {
        id: 5,
        name: "FRENCHFRIES shirt",
        price: 30,
        image: "https://placehold.co/600x400",
        quantity: 1,
        cartId: 4,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProducts));
    console.log("products created:", products);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialProductCategory() {
  console.log("Creating Product_Category...");
  try {
    const productCategoryToCreate = [
      {
        id: 1,
        category_name: "NRG Tenz",
        productId: "1",
      },
      {
        id: 2,
        category_name: "Cloud9 Tenz",
        productId: "2",
      },
      {
        id: 3,
        category_name: "Party Tenz",
        productId: "3",
      },
      {
        id: 4,
        category_name: "Esports Tenz",
        productId: "4",
      },
      {
        id: 5,
        category_name: "FRENCHFRIES Tenz",
        productId: "5",
      },
    ];
    const productCategory = await Promise.all(
      productCategoryToCreate.map(createProductCategoryInfo)
    );
    console.log("Product Category created:", productCategory);
  } catch (error) {
    console.error("error");
  }
}

async function createInitialReview() {
  console.log("Creating review...");
  try {
    const reviewToCreate = [
      {
        id: 1,
        rating: 9,
        comment: "This is an amazing product",
        userId: 1,
        productId: 1,
      },
      {
        id: 2,
        rating: 2,
        comment: "This product SUCKS IM SO UPSET",
        userId: 2,
        productId: 2,
      },
      {
        id: 6,
        rating: 7,
        comment: "It definitely could be better, but I like it",
        userId: 6,
        productId: 4,
      },
      {
        id: 7,
        rating: 9,
        comment: "My store is amazing and so is this product",
        userId: 7,
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
        id: 1,
        isComplete: false,
        total: 50.0,
        userId: 1,
        productId: 1,
        productId: 2,
        productId: 4,
      },
      {
        id: 2,
        isComplete: true,
        total: 45.0,
        userId: 3,
        productId: 2,
        productId: 3,
      },
      {
        id: 3,
        isComplete: true,
        total: 20.0,
        userId: 6,
        productId: 2,
      },
      {
        id: 4,
        isComplete: false,
        total: 50.0,
        userId: 7,
        productId: 2,
        productId: 3,
        productId: 4,
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
    await createInitialProducts();
    await createInitialProductCategory();
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
