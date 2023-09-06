const express = require("express");
const router = express.Router();
const { requireUser, isAdmin } = require("./utils");

const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../db");

//create product(only admin can create product)
// POST /api/products
router.post("/", isAdmin, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    res.json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//get all the products
// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();

    res.json(products);
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

    res.json(product);
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

module.exports = router;
