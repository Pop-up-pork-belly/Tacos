// const prismaClient = require("@prisma/client");
// const prisma = new prismaClient.PrismaClient();

// const getCategory = async (id) => {
//   if (!id) {
//     throw new Error("Missing category data");
//   }

//   return prisma.productCategory.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       products: true,
//     },
//   });
// };

// const getCategories = async () => {
//   // TODO Filter
//   return prisma.productCategory.findMany({
//     include: {
//       products: true,
//     },
//   });
// };

// const createCategory = async (data) => {
//   if (!data.name) {
//     throw new Error("Missing category data");
//   }

//   return prisma.productCategory.create({
//     data: {
//       ...data,
//     },
//     include: {
//       products: true,
//     },
//   });
// };

// const updateCategory = async (id, data) => {
//   if (!id || !data) {
//     throw new Error("Missing category data");
//   }

//   return prisma.productCategory.update({
//     where: {
//       id,
//     },
//     data: {
//       ...data,
//     },
//     include: {
//       products: true,
//     },
//   });
// };

// const deleteCategory = async (id) => {
//   if (!id) {
//     throw new Error("Missing category data");
//   }

//   return prisma.productCategory.delete({
//     where: {
//       id,
//     },
//   });
// };


const client = require("./client");

async function createCategory({ name }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        INSERT INTO categories(name)
        VALUES($1)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [name]
    );

    return category;
  } catch (error) {
    console.error(error);
  }
}

async function getAllCategories() {
  try {
    const { rows: categories } = await client.query(`
        SELECT * 
        FROM categories;
        `);
    return categories;
  } catch (error) {
    console.error(error);
  }
}

async function getCategoryById({ id }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        SELECT *
        FROM categories
        WHERE id=$1;
        `,
      [id]
    );
    return category;
  } catch (error) {
    console.error(error);
  }
}

async function updateCategory({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    const {
      rows: [category],
    } = await client.query(
      `
     UPDATE categories.*
     SET ${setString}
     WHERE id=${id}
     RETURNING *;
    `,
      Object.values(fields)
    );

    return category;
  } catch (error) {
    throw error;
  }
}

async function deleteCategory({ id }) {
  try {
    await client.query(
      `
      DELETE FROM products
      WHERE "productsId"=$1
      RETURNING *;
      `,
      [id]
    );
    const {
      rows: [category],
    } = await client.query(
      `
        DELETE FROM categories
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

    if (!deleteCategory) {
      throw Error;
    } else {
      return category;
    }
  } catch (error) {
    console.error(error);
  }
}

// Need someone to verify they are in agreement here.
async function attachProductsToCategories(order) {
  try {
    const { rows: products } = await client.query(`
        SELECT products.*, categories.id AS id, categories.name AS name, categories."productsId" AS "productsId"
        FROM products
        JOIN categories ON categories"productId"=product.id
        WHERE categories.id=${categories.id}
         `);

    console.log("products to Categories: ", products);
    return products;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createCategory,
  // getCategory,
  // getCategories,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  attachProductsToCategories,
};
