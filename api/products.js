const express = require("express");
const { createProducts } = require("../db");
const router = express.Router();


router.post("/", async (req, res, next)=> {
try{
    const {product_name, price, categoryId, image, quantity } = req.body;

    const product = await createProducts({product_name, price, categoryId, image, quantity });
    res.status(201).json({ message: "Product created successfully" });
    res.send(product)
    } catch (error) {
      console.error(error);
      next(error)
    }
})

module.exports = router;