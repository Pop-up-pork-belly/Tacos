const express = require("express");
const router = express.Router();
const { createReview, getReviewById, getReviewByProduct } = require("../db");

router.get("/:productId", async (req, res, next) => {
  const productId = Number(req.params.productId);
  const reviewId = req.reviews.id;
  try {
    const reviewProduct = await getReviewByProduct(productId);
    if (!reviewId) {
      next({
        error: "ERROR!",
        message: "Review not found",
        name: "No review",
      });
    } else {
      res.send(reviewProduct);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async(req, res, next));
