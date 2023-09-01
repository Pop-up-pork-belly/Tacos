const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

const PASSWORD_LENGTH = 8;
const SALT_COUNT = 10;

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Unauthorized");
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: "2w",
    }
  );
  delete user.password;
  return { token, user };
};

const register = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    //console.log("register_Section: ", _user);
    throw new Error("Email exists already");
  }
  if (password.length < PASSWORD_LENGTH) {
    //console.log("register_password", password);
    throw new Error("Password too short");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign(
    {
      id: createdUser.id,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: "2w",
    }
  );
  delete createdUser.password;
  return { token, user: createdUser };
};
module.exports = { login, register };
