const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const getProduct = async (id) => {
  if (!id) {
    throw new Error("Missing product data");
  }

  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      reviews: true,
      category: true,
    },
  });
};

const getProducts = async () => {
  // TODO Filter
  return prisma.product.findMany({
    include: {
      reviews: true,
      category: true,
    },
  });
};

const createProduct = async (data) => {
  if (!data.name) {
    throw new Error("Missing product data");
  }

  return prisma.product.create({
    data: {
      ...data,
    },
    include: {
      reviews: true,
      category: true,
    },
  });
};

const updateProduct = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing product data");
  }

  return prisma.product.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
    include: {
      reviews: true,
      category: true,
    },
  });
};

const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("Missing product data");
  }

  return prisma.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
