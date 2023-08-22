const client = require("./client");

async function createOrder({userId, productsId, quantity, total, order_date}){

    try{
        const {rows:[orders]} = await client.query(`
       INSERT INTO orders("userId", "productsId", quantity, total, order_date)
       VALUES($1, $2, $3, $4, $5)
       RETURNING *;
        `, [userId, productsId, quantity, total, order_date])

        return orders;
    }catch(error){
        console.error(error)
    }
}


async function getAllOrders(){
    try{
        const {rows:[orders]} = await client.query(`
        SELECT *
        FROM orders;
        `)
        return orders;
    }catch(error){
        console.error(error)
    }
}

async function getOrderById(id){
try{
    const {rows:[orders]} = await client.query(`
    SELECT orders 
    FROM orders
    WHERE id=$1;
    `, [id])

    return orders;
}catch(error){
    console.error(error)
}
}


module.exports ={createOrder, getAllOrders, getOrderById}