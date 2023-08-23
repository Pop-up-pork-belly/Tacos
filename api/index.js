require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");

const { getUserById } = require("../db");

//ROUTER: Authorization for API

// router.use(async (req, res, next) => {
//   const prefix = "Bearer ";
//   const auth = req.header("Authorization");

//   if (!auth) {
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);

//     try {
//       const { id } = jwt.verify(token, process.env.JWT_SECRET);
//       // console.log(jwt.verify(token, process.env.JWT_SECRET));
//       if (id) {
//         req.user = await getUserById(id);
//         next();
//       } else if (!id) {
//         next({ message: "Authorization is not working" });
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: "AuthorizationHeaderError",
//       message: `Authorization token must start with ${prefix}`,
//     });
//   }
// });

// GET /api/health // health check
router.get("/health", async (req, res) => {
  res.status(200).json({ message: "It is healthy" });
});

//GET /api/unknown // 404 Response Error
router.get("/unknown", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// // ROUTER: /api/products
// const productsRouter = require("./products");
// router.use("/products", productsRouter);

// // ROUTER: /api/reviews
// const reviewsRouter = require("./reviews");
// router.use("/reviews", reviewsRouter);

// // ROUTER: /api/orders
// const ordersRouter = require("./orders");
// router.use("/orders", ordersRouter);

// // ROUTER: /api/shipping
// const shippingRouter = require("./shipping");
// router.use("/shipping", shippingRouter);

module.exports = router;
