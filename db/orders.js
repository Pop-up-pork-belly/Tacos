const client = require("./client");

async function createOrder({
  userId,
  productsId,
  quantity,
  total,
  order_date,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
       INSERT INTO orders("userId", "productsId", quantity, total, order_date)
       VALUES($1, $2, $3, $4, $5)
       ON CONFLICT (name) DO NOTHING
       RETURNING *;
        `,
      [userId, productsId, quantity, total, order_date]
    );
    if (!order) {
      throw Error;
    } else {
      // console.log("order: ", order);
      return order;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE id=$1;
      `,
      [id]
    );
    if (!order) {
      throw Error;
    } else {
      // console.log("getOrderById: ", order);
      return order;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrders() {
  try {
    const { rows: allOrders } = await client.query(`
    SELECT orders.*, products.product_name AS "productName"
    FROM orders
    JOIN products ON orders."productsId"=products.id;
    `);

    const singleOrder = await Promise.all(
      allOrders.map((order) => getOrderById(order.id))
    );

    if (!singleOrder) {
      throw Error;
    } else {
      return order;
    }
  } catch (error) {
    console.error(error);
  }
}

// async function getAllOrdersByUser({userId, productId}) {
//   try {
//     const { rows: orders } = await client.query(`
//       SELECT orders.*; users.id AS "userId", products.id AS "productId"
//       FROM orders
//       JOIN users ON orders."userId"=users.id, orders."productId"=products.id
//       WHERE users.id=${userId}, products.id=${productId};
//       `);

//       const singleOrder = await Promise.all(orders.map((order) => getOrderById))
//       }
//     return singleOrderrder;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getOrderByUserId({ userId }) {
//   try {
//     const { }
//   }
// }

module.exports = { createOrder, getAllOrders, getOrderById };
