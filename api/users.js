const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
const { requireUser, isAdmin } = require("./utils.js");
=======
const { requireUser, isAdmin } = require("./utils");

>>>>>>> Development
const {
  login,
  register,
  getUser,
<<<<<<< HEAD
  getUsers,
  updateUser,
  getOrders,
  getCart,
  deleteUser,
=======
  getUserById,
  getUserByUsername,
  updateUser,
  destroyUser,
  getAllOrdersByUserId,
  getOrderById,
  getReviewByUserId,
>>>>>>> Development
} = require("../db");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  console.log("req.body: ", req.body);
  const { email, password } = req.body;
  try {
<<<<<<< HEAD
    const { user, token } = await register(email, password);
    res.send({
      message: "Thank you for registering! :)",
      token,
      user,
    });
  } catch (error) {
    next(error);
=======
    const _user = await getUserByUsername(username);
    if (_user) {
      res.send({
        name: "UserNameExistsError",
        message: `User ${username} is already taken.`,
      });
    }
    if (password.length < passwordMinLength) {
      res.send({
        name: "PasswordMustBe8CharactersError",
        message: "Password Too Short!",
      });
    } else {
      const user = await createUser({
        username,
        password,
        email,
        isAdmin,
      });

      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2w",
        }
      );
      res.send({
        message: "Thank you for registering! :)",
        token: "token",
        user: {
          id: user.id,
          username,
        },
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
>>>>>>> Development
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

// DELETE /api/users/:id
router.delete("/:id", isAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteUser(id);

    res.send({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
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

module.exports = router;
