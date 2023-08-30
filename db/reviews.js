const client = require("./client");

async function createReview({rating, comment, review_date})
try {
    const {rows: [review] } = await client.query(
        `
      INSERT INTO users("productId","userId", rating, comment, review_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `, [productId, userId, rating, comment, review_date]);
      console.log({productId, userId, rating, comment, review_date });
      if (!review) {
      throw Error
    } else {
        return review
    }
    } catch (error) {
        console.log(error)
    }

async function getReviewById(id)
    try {
        const { rows: [review] } = await client.query(`
        SELECT * FROM reviews
        WHERE id=$1;
        `, [id])
        return review
    } catch (error) {
        console.log(error)
    }

    async function getReviewByProduct(productId)
    try {
        const { rows: [review] } = await client.query(`
        SELECT * FROM reviews
        where "productId"=$1;
        `, [productId])
        return review
    } catch (error) {
        console.log(error)
    }
module.exports = {
    createReview,
    getReviewById,
    getReviewByProduct
}