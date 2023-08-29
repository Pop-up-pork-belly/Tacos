const client = require("./client");

async function createProducts({
  product_name,
  price,
  categoryId,
  image,
  quantity,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(product_name, price, "categoryId", image, quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [product_name, price, categoryId, image, quantity]
    );

    return product;
  } catch (error) {
    console.error(error);
  }
}

async function getAllProducts() {
  try {
    const {
      rows: [products],
    } = await client.query(`
        SELECT * 
        FROM products;
        `)
        return products
    }catch(error){
        console.error(error)
    }
}


async function getProductsById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT products
        FROM products
        WHERE id = $1;
        `,
      [id]
    );
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function deleteProduct(id){
    try{
        await client.query(`
        DELETE FROM products
        WHERE id=$1;
        `,[id])
      
    }catch(error){
        console.error(error)
    }
}
module.exports ={createProducts, getAllProducts, getProductsById, deleteProduct}

