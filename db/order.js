const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const getCart = async (id) => {
  if (!id) {
    throw new Error("Missing order data");
  }

  let latest = await prisma.order.findFirst({
    where: {
      isComplete: false,
      userId: id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!latest) {
    latest = await prisma.order.create({
      data: {
        isComplete: false,
        total: 0,
        userId: id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return latest;
};

const getOrder = async (id) => {
  if (!id) {
    throw new Error("Missing order data");
  }

  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};

const getOrders = async (id) => {
  if (!id) {
    throw new Error("Missing order data");
  }

  // TODO Filter
  return prisma.product.findMany({
    where: {
      userId: id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};

const updateOrder = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing order data");
  }

  if (data.products) {
    const products = body?.products?.length
      ? body?.products
      : body?.products === null
      ? []
      : undefined;

    // remove off body so we dont try to update
    delete data.products;

    if (products?.length) {
      // Remove all products off order and readd them
      await prisma.orderProduct.deleteMany({
        where: {
          orderId: id,
        },
      });
    }

    let total = 0;
    for (const product of products) {
      const orderProduct = await prisma.orderProduct.create({
        data: {
          quantity: product.quantity,
          productId: product.productId,
          orderId: id,
        },
        include: {
          product: true,
        },
      });

      total += orderProduct.quantity * orderProduct.product.price;
    }
  }

  return prisma.order.update({
    where: {
      id,
    },
    data: {
      ...data,
      total,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};

const deleteOrder = async (id) => {
  if (!id) {
    throw new Error("Missing order data");
  }

  return prisma.order.delete({
    where: {
      id,
    },
  });
};

const addOrderProduct = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing order product data");
  }

  return prisma.orderProduct.create({
    data: {
      ...data,
      orderId: id,
    },
  });
};

const removeOrderProduct = async (id, productId) => {
  if (!id || !productId) {
    throw new Error("Missing order product data");
  }

  return prisma.orderProduct.delete({
    where: {
      orderId: id,
      productId,
    },
  });
};

module.exports = {
  getCart,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  addOrderProduct,
  removeOrderProduct,
};
