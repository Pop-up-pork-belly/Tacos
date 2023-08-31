const express = require("express");
const { getReviewByProduct, createReview} = require("../db/reviews");
const router = express.Router();

//get review by Id
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

//create review
router.post("/", async(req, res, next) => {
try{
  const {productId, userId, rating, comment, review_date} = req.body;

  const review = await createReview({
    productId, 
    userId,
    rating,
    comment,
    review_date
  });

  res.status(201).json({message: "review created successfully"})
  res.send(review)
}catch(error){
  console.error(error);
  next(error);
}

});

//delete review (chceck if routing is correct)
router.delete("/:username/reviews/:reviewId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await deleteProduct(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});
