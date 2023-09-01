const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const getUser = async (id) => {
  if (!id) {
    throw new Error("Missing user data");
  }

  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      isAdmin: true,
    },
  });
};

const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isAdmin: true,
    },
  });
};

const updateUser = async (id, data) => {
  if (!id || !data) {
    throw new Error("Missing user data");
  }
  delete data.password;
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};

const deleteUser = async (id) => {
  if (!id) {
    throw new Error("Missing user data");
  }

  return prisma.user.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
