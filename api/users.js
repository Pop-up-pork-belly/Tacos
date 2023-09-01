const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { requireUser } = require("./utils.js");
const {
  login,
  register,
  getUser,
  getUsers,
  updateUser,
  getOrders,
  getCart,
} = require("../db");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  console.log("req.body: ", req.body);
  const { password, email } = req.body;
  try {
    const { user, token } = await register(email, password);
    res.send({
      message: "Thank you for registering! :)",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await login(email, password);

    res.send({
      user,
      token,
      message: "You're logged in!",
    });
    console.log("YOU ARE LOGGED IN ");
  } catch ({ name, message }) {
    console.log("Unable to log in");
    next({
      name: "LoginError",
      message: "An error has occurred during login.",
    });
  }
});

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
router.get("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);

    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me
router.get("/me", requireUser, async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await getUser(id);

    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:id/orders
router.get("/:id/orders", requireUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const orders = await getOrders(id);

    res.send(orders);
  } catch (error) {
    console.error(error);
  }
});

// UPDATE /api/users/:id
router.patch("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await updateUser(id, req.body);

    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:id/cart
router.get("/:id/cart", requireUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await getCart(id);

    res.send(cart);
  } catch (error) {
    console.error(error);
  }
});
