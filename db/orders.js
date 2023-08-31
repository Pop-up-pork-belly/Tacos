const client = require("./client");
const { attachProductsToOrders } = require("./products");

async function createOrder({
  userId,
  productsId,
  quantity,
  total,
  order_date,
}) {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
       INSERT INTO orders("userId", "productsId", quantity, total, order_date)
       VALUES($1, $2, $3, $4, $5)
       RETURNING *;
        `,
      [userId, productsId, quantity, total, order_date]
    );

    return orders;
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrders() {
  try {
    const { rows: allOrders = [] } = await client.query(`
    SELECT orders.*, products.product_name AS "productName"
    FROM orders
    JOIN products ON orders."productsId"=products.id;
    `);

    const singleOrder = await Promise.all(
      allOrders.map((order) => getAllOrdersByUser(order.id))
    );

    if (!singleOrder) {
      throw Error;
    } else {
      return singleOrder;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrdersByUser({ userId }) {
  try {
    const { rows: orders = [] } = await client.query(`
      SELECT orders.*; users.id AS "userId"
      FROM orders
      JOIN users ON orders."userId"=users.id
      WHERE users.id=${userId};
      `);

    for (const order of orders) {
      const products = await attachProductsToOrders(order);
      order.products = products;
    }

    if (!orders) {
      throw Error;
    } else {
      return orders;
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateOrder(productsId, quantity, total) {
  try {
    const {
      rows: [updatedOrder],
    } = await client.query(
      `
    UPDATE orders
    SET "productId" = $1, "quantity" = $2, AND "total" = $3
    RETURNING *;
    `,
      [productsId, quantity, total]
    );

    for (const order of orders) {
      const products = await attachProductsToOrders(order);
      order.products = products;
    }

    if (!updatedOrder) {
      throw Error;
    } else {
      return updatedOrder;
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteOrder(id) {
  try {
    await client.query(
      `
      DELETE FROM products
      WHERE "productsId"=$1
      RETURNING *;
      `,
      [id]
    );
    const {
      rows: [deleteOrder],
    } = await client.query(
      `
      DELETE FROM orders
      WHERE id=$1
      RETURNING *;
      `,
      [id]
    );

    if (!deleteOrder) {
      throw Error;
    } else {
      return order;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getAllOrdersByUser,
  updateOrder,
  deleteOrder,
};
