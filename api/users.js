const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { requireUser, isAdmin } = require("./utils");

const {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
  destroyUser,
  getAllOrdersByUserId,
  getOrderById,
  getReviewByUserId,
} = require("../db");

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers) {
      res.send({ users: allUsers });
    } else {
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  console.log("req.body: ", req.body);
  const { username, password, email, isAdmin } = req.body;
  const passwordMinLength = 8;
  try {
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
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET
      );

      res.send({
        user: {
          id: user.id,
          username: username,
        },

        message: "You're logged in!",
        token,
      });
      console.log("YOU ARE LOGGED IN ");
    }
  } catch ({ name, message }) {
    console.log("Unable to log in");
    next({
      name: "LoginError",
      message: "An error has occurred during login.",
    });
  }
});

// GET /api/users/:id
router.get("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);

    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me
router.get("/me", requireUser, async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await getUserById(id);

    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/profile
router.get("/:username/profile", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      res.send({
        name: "WrongProfileUser",
        message: "You are not permitted to see this profile!",
      });
    } else {
      res.send(currentUser);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/orders
router.get("/:username/orders", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      res.send({
        name: "WrongProfileUser",
        message: "You are not permitted to see this profile!",
      });
    } else {
      const ordersByUser = await getAllOrdersByUserId(currentUser.id);
      res.send(ordersByUser);
    }
  } catch ({ name, message }) {
    console.error({ name, message });
  }
});

// GET /api/users/reviews
router.get("/:username/reviews", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const currentUser = await getUserById(userId);
    if (!currentUser) {
      res.send({
        name: "WrongProfileUser",
        message: "You are not permitted to see this profile!",
      });
    } else {
      const reviewsByUser = await getReviewByUserId(currentUser.id);
      res.send(ordersByUser);
    }
  } catch ({ name, message }) {
    console.error({ name, message });
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

// DELETE /api/users/:userId
router.delete("/:userId", requireUser, isAdmin, async (req, res, next) => {
  const { userId } = req.params;
  const { id } = req.user;

  try {
    const theUser = await getUserById(userId);
    if (theUser.id === id) {
      const deleteUser = await destroyUser({
        id: userId,
      });

      res.send(deleteUser);
    } else {
      res.status(403).send({
        name: "403Error",
        message: `User ${req.user.username} is not allowed to be deleted.`,
        error: "Error",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:id/cart
router.get("/:id/cart", requireUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await getOrderById(id);

    res.send(cart);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
