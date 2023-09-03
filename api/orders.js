const express = require("express");
const router = express.Router();
const { requireUser, isAdmin } = require("./utils");

const {
  createOrder,
  // getOrderById,
  getAllOrders,
  getAllOrdersByUser,
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
  const { productsId, quantity, total } = req.body;

  try {
    const userId = id;
    const addOrder = await createOrder({
      userId,
      productsId,
      quantity,
      total,
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

// DELETE /api/routines/:routineId
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
