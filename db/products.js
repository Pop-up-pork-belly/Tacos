const client = require("./client");

async function createProducts({product_name, price, categoryId, image, quantity}) {

    try{
        const {rows:[product]} = await client.query(`
        INSERT INTO products(product_name, price, "categoryId", image, quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `, [product_name, price, categoryId, image, quantity ])

        return product;
    }catch(error){
        console.error(error)
    }
}

async function getProducts(){
    try{
        const {rows:[products]} = await client.query(`
        SELECT * 
        FROM prodcuts;
        `)
        console.log("getting all prodcuts", products)
        return products
    }catch(error){
        console.error(error)
    }
}

async function getProductsById(productId){
    try{
        const {rows:[product]} = await client.query(`
        SELECT products
        FROM products
        WHERE id = $1;
        `,[productId])
        return product
    }catch(error){
        console.error(error)
    }
}
module.exports ={createProducts, getProducts, getProductsById}