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


async function getProductById({id}) {
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

async function deleteProduct({id}){
    try{
        await client.query(`
        DELETE FROM products
        WHERE id=$1;
        `,[id])
      
    }catch(error){
        console.error(error)
    }
}

async function updateProduct({id, ...fields}) {

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  try{
    const { rows: [product] } = await client.query(`
     UPDATE products
     SET ${setString}
     WHERE id=${id}
     RETURNING *;
    `, Object.values(fields));

    return product;
  }catch(error){
    throw error;
  }
}

// Need someone to verify they are in agreement here.
async function attachProductsToOrders(order) {
  try {
    const { rows: products } = await client.query(`
        SELECT products.*, orders.id AS id, orders."userId" AS "userId", orders."productsId" AS "productsId", orders.quantity AS quantity, orders.total AS total
        FROM products
        JOIN orders ON orders."productId"=product.id
        WHERE orders.id=${order.id}
         `);

    console.log("products to Orders: ", products);
    return products;
  } catch (error) {
    console.error(error);
  }
}

module.exports ={createProducts, getAllProducts, getProductById, deleteProduct, updateProduct, attachProductsToOrders }
