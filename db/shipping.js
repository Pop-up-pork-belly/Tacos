const client = require("./client");

async function createShippingInfo({
  orderId,
  street,
  city,
  state,
  zip,
  country,
}) {
  try {
    const {
      rows: [shipping_info],
    } = await client.query(
      `
        INSERT INTO shipping_info("orderId", street, city, state, zip, country)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [orderId, street, city, state, zip, country]
    );

    return shipping_info;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createShippingInfo };
