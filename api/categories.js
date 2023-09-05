const express = require("express");
const router = express.Router();
const { requireUser, isAdmin } = require("./utils");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  attachProductsToCategories,
} = require("../db");

// GET /api/categories
router.get("/", async (req, res, next) => {
  try {
    const allCategories = await getAllCategories();
    if (allCategories) {
      res.send({ orders: allCategories });
    } else {
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/categories
router.post("/", isAdmin, async (req, res, next) => {
  const { id } = req.user;
  const { name } = req.body;

  try {
    const addCategory = await createCategory({
      name,
    });
    res.send(addCategory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH  /api/categories/:categoryId
router.patch("/:categoryId", isAdmin, async (req, res, next) => {
  const { categoryId } = req.params;
  const { id } = req.user;
  const { name } = req.body;

  try {
    const theCategory = await getCategoryById(categoryId);
    if (theCategory.userId === id) {
      const updateCategory = await updateCategory({
        id: categoryId,
        ...req.body,
      });

      res.send(updateCategory);
    } else {
      res.status(403).send({
        name: "403error",
        message: `User ${req.user.username} is not allowed to update the Category`,
        error: "Error",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/categories/:categoryId
router.delete("/:categoryId", isAdmin, async (req, res, next) => {
  const { categoryId } = req.params;
  const { id } = req.user;

  try {
    const theCategory = await getCategoryById(categoryId);

    const destroyCategory = await deleteOrder({
      id: orderId,
    });

    res.send(destroyCategory);

    res.status(403).send({
      name: "403Error",
      message: `User ${req.user.username} is not allowed to delete this order!`,
      error: "Error",
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
