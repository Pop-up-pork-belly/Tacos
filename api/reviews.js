const express = require('express');
const router = express.Router();
const {
    createReview,
    getReviewById,
    getReviewByProduct
} = require('../db');

router.get('/', async, (req, res, next) => {
    try {
        const reviews = await getReviewByProduct();
        if (!reviews) {
            throw Error;
        } else {
            res.send(reviews)
        }
    } catch (error) {
        next(error)
    }
})