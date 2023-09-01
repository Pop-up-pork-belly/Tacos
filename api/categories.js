const express = require("express");
const router = express.Router();
const {
  getCategory,
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../db");

// POST /api/category
router.post("/", async (req, res, next) => {
  try {
    const category = await createCategory(req.body);

    res.send(category);
  } catch (error) {
    next(error);
  }
});

// GET /api/category/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await getCategory(req.body);

    res.send(category);
  } catch (error) {
    next(error);
  }
});

// GET /api/categories
router.get("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await getCategories(req.body);

    res.send(category);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/category/:id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await createCategory(req.body);

    res.send(category);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/category/:id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteCategory(id, req.body);

    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
});
