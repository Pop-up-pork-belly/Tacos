const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const getCategory = async (id) => {
  if (!id) {
    throw new Error("Missing category data");
  }

  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

const getCategories = async () => {
  // TODO Filter
  return prisma.category.findMany();
};

const createCategory = async (data) => {
  if (!data.name) {
    throw new Error("Missing category data");
  }

  return prisma.category.create({
    data: {
      ...data,
    },
  });
};

const updateCategory = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing category data");
  }

  return prisma.category.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};

const deleteCategory = async (id) => {
  if (!id) {
    throw new Error("Missing category data");
  }

  return prisma.category.delete({
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
