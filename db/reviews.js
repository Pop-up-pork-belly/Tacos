const client = require("./client");

async function createReview({rating, comment, review_date})
try {
    const {rows: [review] } = await client.query(
        `
      INSERT INTO users(rating, comment, review_date)
      VALUES ($1, $2, $3)
      RETURNING *;
      `, [rating, comment, review_date]);
      console.log({ rating, comment, review_date });
      if (!review) {
      throw Error
    } else {
        return review
    }
    } catch (error) {
        console.log(error)
    }

module.exports = {
    createReview
}