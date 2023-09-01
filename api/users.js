const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { requireUser } = require("./utils.js");
const { JWT_SECRET } = process.env;

const {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  getAllOrdersByUser,
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
      //console.log("register_Section: ", _user);
      res.send({
        name: "UserNameExistsError",
        message: `User ${username} is already taken.`,
      });
    }
    if (password.length < passwordMinLength) {
      //console.log("register_password", password);
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
      console.log("what is this exactly,", process.env.JWT_SECRET);
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
  } catch (error) {
    next(error);
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
  const { username } = req.params;

  try {
    const currentUser = await getUserByUsername(username);
    if (!currentUser) {
      res.send({
        name: "WrongProfileUser",
        message: "You are not permitted to see this profile!",
      });
    } else {
      const ordersByUser = await getAllOrdersByUser(currentUser.id);
      res.send(ordersByUser);
    }
  } catch (error) {
    console.error(error);
  }
});

// PATCH /api/users(admin)/products?

module.exports = router;
