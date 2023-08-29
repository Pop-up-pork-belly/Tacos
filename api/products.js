const express = require("express");
const { createProducts, getAllProducts, deleteProduct } = require("../db");
const router = express.Router();

// function isAdmin(req, res, next) {
//   const user = req.user;
//   console.log("TESTTTTTT>>>>>>>>", user.isAdmin)
//   if(user && user.isAdmin) {
//     next()
//   }else{
//     res.status(403).json({message: 'Only admins can perform this action'})
//   }
// }



//create product(only admin can create product)


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
//get all the products 
router.get("/getProducts", async (req, res, next)=> {
  try{
    const products = getAllProducts();
    res.send("getting all products",products)
  }catch(error){
    next(error)
  }
})

//delete product(only admin can delete products)
router.delete("/:productId", async (req, res, next)=>{
  try{
    const productId = req.params.Id;
    await deleteProduct(productId)
  }catch(error){
    next(error)
  }
})

//edit product


module.exports = router;