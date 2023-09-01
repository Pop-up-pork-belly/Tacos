const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

async function main() {
  // Create Users
  const testUser1 = await prisma.user.upsert({
    where: { email: "testUser1@gmail.com" },
    update: {},
    create: {
      id: 1,
      email: "testUser1@gmail.com",
      password: await bcrypt.hash("TESTTEST1", SALT_COUNT),
      isAdmin: false,
    },
  });
  const testUser2 = await prisma.user.upsert({
    where: { email: "testUser2@gmail.com" },
    update: {},
    create: {
      id: 2,
      email: "testUser2@gmail.com",
      password: await bcrypt.hash("TESTTEST2", SALT_COUNT),
      isAdmin: true,
    },
  });
  const eddiasde = await prisma.user.upsert({
    where: { email: "eddieMainMan99@gmail.com" },
    update: {},
    create: {
      id: 3,
      email: "eddieMainMan99@gmail.com",
      password: "12312313fafsadfas",
      isAdmin: false,
    },
  });
  const yoasdooo = await prisma.user.upsert({
    where: { email: "Domtheman42@yahoo.com" },
    update: {},
    create: {
      id: 4,
      email: "Domtheman42@yahoo.com",
      password: "123adsfasd",
      isAdmin: false,
    },
  });
  const d3reasw = await prisma.user.upsert({
    where: { email: "drew32@gmail.com" },
    update: {},
    create: {
      id: 5,
      password: "supadfaaa",
      email: "drew32@gmail.com",
      isAdmin: false,
    },
  });
  const h3arsasdhil = await prisma.user.upsert({
    where: { email: "harshil478@hotmail.com" },
    update: {},
    create: {
      id: 6,
      password: "123asdf",
      email: "harshil478@hotmail.com",
      isAdmin: false,
    },
  });

  // Create Products
  const Tenz = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "NRG Tenz shirt",
      price: 25,
      image: "https://placehold.co/400x400",
    },
  });
  const Faze = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "FaZe shirt",
      price: 30,
      image: "https://placehold.co/400x400",
    },
  });
  const Cloud9 = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Cloud-9 shirt",
      price: 24.99,
      image: "https://placehold.co/400x400",
    },
  });

  // Create Categories

  // Create Orders

  // Create Products

  // Create Reviews
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
