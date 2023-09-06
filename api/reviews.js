const express = require("express");
const router = express.Router();
const {
  getReview,
  getReviews,
  updateReview,
  createReview,
  deleteReview,
} = require("../db");

// POST /api/reviews
router.post("/", async (req, res, next) => {
  try {
    const review = await createReview(req.body);

    res.send(review);
  } catch (error) {
    next(error);
  }
});

// GET /api/reviews/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await getReview(id);

    res.send(review);
  } catch (error) {
    next(error);
  }
});

// GET /api/reviews
router.get("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviews = await getReviews(req.body);

    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/reviews/:id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await updateReview(id, req.body);

    res.send(review);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/reviews/:id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteReview(id, req.body);

    res.send({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
