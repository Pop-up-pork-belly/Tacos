require("dotenv").config();
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
} = require("../db");

// GET /api/users
router.get("/");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  console.log("req.body: ", req.body);
  const { username, password, email, isAdmin } = req.body;
  const passwordMinLength = 8;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      //console.log("LINE 24 in USERS/API", _user);
      res.send({
        name: "UserNameExistsError",
        message: `User ${username} is already taken.`,
      });
    }
    if (password.length < passwordMinLength) {
      //console.log("password", password);
      res.send({
        name: "PasswordMustBe8CharactersError",
        message: "Password Too Short!",
      });
    } else {
      const user = await createUser({
        username,
        password,
        email,
        isAdmin
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
          "id": user.id,
          username
        },
      });
    }
  } catch (error) {
    //console.log("This is line 66 in Catch section", { name, message });
   next(error)
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign({
        id: user.id, username: user.username
      },
        process.env.JWT_SECRET);

      res.send({
        "user": {
          "id": user.id,
          "username": username,

        },
        
        message: "you're logged in!", token
      });
      console.log("YOU ARE LOGGED IN ")
    }
  } catch (error) {
    console.log("unable to log in");
    next(error);
  }
});

// GET /api/users/profile
router.get("/:username/profile", requireUser, async (req, res, next) => {
  const { username } = req.params;
  try {
    const currentUser = await getUserByUsername(username);
    if (!currentUser) {
      next({
        name: "WrongProfileUser",
        message: "You are not permitted to see this profile!",
      });
    } else {
      res.send(currentUsers);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/orders
router.get("/:username/orders", requireUser, async (req, res, next) => {
  const { username } = req.params;
});

// GET /api/users/cart
router.get("/:username/cart", requireUser, async (req, res, next) => {
  const { username } = req.params;
});

// PATCH /api/users(admin)/products?

module.exports = router;
