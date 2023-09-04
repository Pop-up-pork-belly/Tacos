const express = require("express");
const router = express.Router();
const { requireUser, isAdmin } = require("./utils");

const {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewByProductId,
  deleteReview,
  getReviewByUserId,
} = require("../db/reviews");

// GET /api/reviews
router.get("/", async (req, res, next) => {
  try {
    const allReviews = await getAllReviews();
    if (allReviews) {
      res.send({ users: allReviews });
    } else {
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//get review by Id
router.get("/:productId/:reviewId", async (req, res, next) => {
  const productId = Number(req.params.productId);
  const reviewId = req.reviews.id;
  try {
    const reviewProduct = await getReviewByProductId(productId);
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

//create review
router.post("/:reviewId", async (req, res, next) => {
  try {
    const { userId, productId, rating, comment, review_date } = req.body;

    const review = await createReview({
      userId,
      productId,
      rating,
      comment,
      review_date,
    });

    res.status(201).json({ message: "review created successfully" });
    res.send(review);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//delete review (chceck if routing is correct)
router.delete("/:reviewId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await deleteProduct(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
