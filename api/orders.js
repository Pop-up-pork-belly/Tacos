const express = require("express");
const router = express.Router();
const { requireUser, isAdmin } = require("./utils");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../db");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    if (allOrders) {
      res.send({ orders: allOrders });
    } else {
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/orders
router.post("/", requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { isComplete, total, order_date, productsId, cartId } = req.body;

  try {
    const userOrderId = id;
    const addOrder = await createOrder({
      isComplete,
      total,
      order_date,
      userOrderId,
      productsId,
      cartId,
    });
    res.send(addOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH  /api/orders/:orderId
router.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id } = req.user;
  const { productsId, quantity, total } = req.body;

  try {
    const theOrder = await getOrderById(orderId);
    if (theOrder.userId === id) {
      const updateOrder = await updateOrder({
        id: orderId,
        ...req.body,
      });

      res.send(updateOrder);
    } else {
      res.status(403).send({
        name: "403error",
        message: `User ${req.user.username} is not allowed to update the order`,
        error: "Error",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/orders/:orderId
router.delete("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id } = req.user;
  // const { productsId, quantity, total } = req.body;

  try {
    const theOrder = await getOrderById(orderId);
    if (theOrder.userId === id) {
      const destroyOrder = await deleteOrder({
        id: orderId,
      });

      res.send(destroyOrder);
    } else {
      res.status(403).send({
        name: "403Error",
        message: `User ${req.user.username} is not allowed to delete this order!`,
        error: "Error",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /orders/:userId
router.get("/order/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const order = await getAllOrdersByUserId(userId);
    if (order) {
      res.send(order);
    } else {
      res.send({
        error: "DeleteError",
        title: "Can't find order by user Id",
        message: `${userId}'s order not found.`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// come back and finalized after teammate finalizes products. Also AddProductsToOrders here or on products api and db?

// POST /api/orders/:orderId/products
// router.post("/:orderId/products", requireUser, async (req, res, next) => {
//   const { orderId } = req.params;
//   // const { id } = req.user;
// //   const { productsId, quantity, total } = req.body;

//     return newActivity;
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });
