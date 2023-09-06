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
    include: {
      user: true,
      products: true,
    },
  });
};

const getReviews = async () => {
  // TODO Filter
  return prisma.review.findMany({
    include: {
      user: true,
      products: true,
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
    include: {
      user: true,
      products: true,
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
    include: {
      user: true,
      products: true,
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
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
