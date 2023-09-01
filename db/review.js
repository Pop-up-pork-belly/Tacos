const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const getReview = async (id) => {
  if (!id) {
    throw new Error("Missing review data");
  }

  return prisma.review.findUnique({
    where: {
      id,
    },
  });
};

const createReview = async (data) => {
  if (!data.name || !data.userId || !data.productId) {
    throw new Error("Missing review data");
  }

  return prisma.review.create({
    data: {
      ...data,
    },
  });
};

const updateReview = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing review data");
  }

  return prisma.review.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};

const deleteReview = async (id) => {
  if (!id) {
    throw new Error("Missing review data");
  }

  return prisma.review.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
