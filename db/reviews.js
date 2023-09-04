const client = require("./client");

async function createReview({
  userId,
  productId,
  rating,
  comment,
  review_date,
}) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO reviews( "userId", "productId", rating, comment, review_date)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT ("userId", "productId")
            RETURNING *;
     `,
      [userId, productId, rating, comment, review_date]
    );

    if (!review) {
      throw Error;
    } else {
      return review;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllReviews() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM reviews;
      `
    );

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getReviewById(id) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
        SELECT * 
        FROM reviews
        WHERE id=$1;
        `,
      [id]
    );
    return review;
  } catch (error) {
    console.log(error);
  }
}

async function getReviewByProductId({ productId }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
        SELECT * 
        FROM reviews
        where "productId"=$1;
        `,
      [productId]
    );
    return review;
  } catch (error) {
    console.log(error);
  }
}

async function getReviewByUserId({ userId }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT * 
    FROM reviews 
    WHERE "userId"=$1;
    `,
      [userId]
    );

    return review;
  } catch (error) {
    console.error(error);
  }
}

async function deleteReview(id) {
  try {
    await client.query(
      `
    DELETE FROM reviews
    WHERE id=$1
    ;
    `,
      [id]
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewByProductId,
  getReviewByUserId,
  deleteReview,
};
