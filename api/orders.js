const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");

const {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  removeOrderProduct,
  addOrderProduct,
} = require("../db");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getOrders();

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id
router.get("/", async (req, res, next) => {
  try {
    const order = await getOrder(id, req.body);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

// PATCH  /api/orders/:id
router.patch("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await updateOrder(id, req.body);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/:id/removeProduct/:productId
router.delete("/:id/removeProduct", requireUser, async (req, res, next) => {
  const { id, productId } = req.params;
  try {
    const orderProduct = await removeOrderProduct(id, productId);

    res.send(orderProduct);
  } catch (error) {
    next(error);
  }
});

// POST  /api/orders/:orderId/addProduct
router.post("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const orderProduct = await addOrderProduct(id, req.body);

    res.send(orderProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/:id
router.delete("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteOrder(id);

    res.send({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
