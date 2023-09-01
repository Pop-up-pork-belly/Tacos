const express = require("express");
const router = express.Router();
const {
  createProducts,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../db");
const { isAdmin } = require("./utils.js");

//create product(only admin can create product)
// POST /api/products
router.post("/", isAdmin, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    res.send(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//get all the products
// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const product = getProducts();

    res.send(product);
  } catch (error) {
    next(error);
  }
});

//edit product
// UPDATE /api/products/:id
router.patch("/:id", isAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await updateProduct(id, req.body);

    res.send(product);
  } catch (error) {
    next(error);
  }
});

//delete product(only admin can delete products)
// DELETE /api/products/:id
router.delete("/:id", isAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);

    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});
