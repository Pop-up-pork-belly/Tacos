const express = require("express");
const router = express.Router();
const { requireUser, isAdmin } = require("./utils");

const {
  createProducts,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../db");

//create product(only admin can create product)

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name, description, price, quantity, categoryId, image } = req.body;

    const product = await createProducts({
      name,
      description,
      price,
      quantity,
      categoryId,
      image,
    });

    res.status(201).json({ message: "Product created successfully" });
    res.send(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//get all the products
router.get("/", async (req, res, next) => {
  try {
    const products = getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//delete product(only admin can delete products)
router.delete("/:productId", isAdmin, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await deleteProduct(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

//edit product
router.patch("/:productId", isAdmin, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updateProductFields = req.body;

    const updatedProduct = await updateProduct({
      id: productId,
      ...updateProductFields,
    });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
