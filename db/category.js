const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const getCategory = async (id) => {
  if (!id) {
    throw new Error("Missing category data");
  }

  return prisma.productCategory.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });
};

const getCategories = async () => {
  // TODO Filter
  return prisma.productCategory.findMany({
    include: {
      products: true,
    },
  });
};

const createCategory = async (data) => {
  if (!data.name) {
    throw new Error("Missing category data");
  }

  return prisma.productCategory.create({
    data: {
      ...data,
    },
    include: {
      products: true,
    },
  });
};

const updateCategory = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing category data");
  }

  return prisma.productCategory.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
    include: {
      products: true,
    },
  });
};

const deleteCategory = async (id) => {
  if (!id) {
    throw new Error("Missing category data");
  }

  return prisma.productCategory.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
