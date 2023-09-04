const client = require("./client");
const { attachProductsToOrders } = require("./products");

async function createOrder({
  isComplete,
  total,
  order_date,
  userId,
  productsId,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
       INSERT INTO orders( isComplete, total, order_date, userOrderId, productsId, cartId )
       VALUES($1, $2, $3, $4, $5)
       ON CONFLICT ("userId", "productsId", "cartId") DO NOTHING
       RETURNING *;
        `,
      [isComplete, total, order_date, userOrderId, productsId, cartId]
    );

    return order;
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

    return order;
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrdersByUserId({ userId }) {
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

// async function updateOrder1(productsId, quantity, total) {
//   try {
//     const {
//       rows: [updatedOrder],
//     } = await client.query(
//       `
//     UPDATE orders
//     SET "productId" = $1, "quantity" = $2, AND "total" = $3
//     RETURNING *;
//     `,
//       [productsId, quantity, total]
//     );

//     for (const order of orders) {
//       const products = await attachProductsToOrders(order);
//       order.products = products;
//     }

//     if (!updatedOrder) {
//       throw Error;
//     } else {
//       return updatedOrder;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

async function updateOrder({ id, ...fields }) {
  const updateString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (updateString.length > 0) {
      await client.query(
        `
      UPDATE orders
      SET ${updateString}
      WHERE id=${id}
      RETURNING *;
      `,
        Object.values(fields)
      );
    }
    return await getOrderById(id);
  } catch (error) {
    throw new Error("Could not update Routine");
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
  getAllOrdersByUserId,
  updateOrder,
  deleteOrder,
};
