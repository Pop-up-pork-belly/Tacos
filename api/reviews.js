// const express = require("express");
// const router = express.Router();
// const {
//   getReview,
//   getReviews,
//   updateReview,
//   createReview,
//   deleteReview,
// } = require("../db");

// // POST /api/reviews
// router.post("/", async (req, res, next) => {
//   try {
//     const review = await createReview(req.body);

//     res.send(review);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET /api/reviews/:id
// router.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const review = await getReview(id);

//     res.send(review);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET /api/reviews
// router.get("/", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const reviews = await getReviews(req.body);

//     res.send(reviews);
//   } catch (error) {
//     next(error);
//   }
// });

// // PATCH /api/reviews/:id
// router.patch("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const review = await updateReview(id, req.body);

//     res.send(review);
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE /api/reviews/:id
// router.patch("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     await deleteReview(id, req.body);

//     res.send({ message: "Review deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;


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
} = require("../db");

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
    const { rating, comment, review_date, userId, productId } = req.body;

    const review = await createReview({
      rating,
      comment,
      review_date,
      userId,
      productId,
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
