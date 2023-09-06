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

  // Create Categories
  const nrgTenz1 = await prisma.productCategory.upsert({
    where: { name: "NRG Tenz" },
    update: {},
    create: {
      id: 1,
      name: "NRG Tenz",
    },
  });

  const cloud91 = await prisma.productCategory.upsert({
    where: { name: "Cloud9" },
    update: {},
    create: {
      id: 2,
      name: "Cloud9",
    },
  });

  const party1 = await prisma.productCategory.upsert({
    where: { name: "Party1" },
    update: {},
    create: {
      id: 3,
      name: "Party1",
    },
  });

  const eSports1 = await prisma.productCategory.upsert({
    where: { name: "Esports" },
    update: {},
    create: {
      id: 4,
      name: "Esports",
    },
  });

  const frenchFries1 = await prisma.productCategory.upsert({
    where: { name: "FRENCHFRIES" },
    update: {},
    create: {
      id: 5,
      name: "FRENCHFRIES",
    },
  });

  // Create Products
  const tenzShirt = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "NRG Tenz shirt",
      description: "Blahblahblahbalhbalabhlab",
      price: 25,
      image: "https://placehold.co/300x400",
      categoryId: 1,
    },
  });
  const cloud9Shirt = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Cloud9 shirt",
      description: "djwiladjiwlajdijwaldjwilajdlw",
      price: 20,
      image: "https://placehold.co/600x400",
      categoryId: 2,
    },
  });
  const partyShirt = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Party shirt",
      description: "SO ON SO FORTH PARTY",
      price: 15,
      image: "https://placehold.co/200x200",
      categoryId: 3,
    },
  });
  const eSportsShirt = await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Esports shirt",
      description: "HAPPY ESPORTS",
      price: 12,
      image: "https://placehold.co/300x300",
      categoryId: 4,
    },
  });
  const frenchFriesShirt = await prisma.product.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "FRENCHFRIES shirt",
      description: "FRENCH FRIES",
      price: 30,
      image: "https://placehold.co/600x400",
      categoryId: 5,
    },
  });

  // Create Reviews
  const review1 = await prisma.review.upsert({
    where: { id: 1 },
    update: {},
    create: {
      rating: 9,
      comment: "This is an amazing product",
      userId: 1,
      productId: 1,
    },
  });
  const review2 = await prisma.review.upsert({
    where: { id: 2 },
    update: {},
    create: {
      rating: 2,
      comment: "This product SUCKS IM SO UPSET",
      userId: 2,
      productId: 2,
    },
  });
  const review3 = await prisma.review.upsert({
    where: { id: 3 },
    update: {},
    create: {
      rating: 7,
      comment: "It definitely could be better, but I like it",
      userId: 6,
      productId: 4,
    },
  });
  const review4 = await prisma.review.upsert({
    where: { id: 4 },
    update: {},
    create: {
      rating: 9,
      comment: "My store is amazing and so is this product",
      userId: 5,
      productId: 5,
    },
  });

  // Create Orders
  const order1 = await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      isComplete: false,
      total: 50.0,
      userId: 1,
    },
  });
  const order2 = await prisma.order.upsert({
    where: { id: 2 },
    update: {},
    create: {
      isComplete: true,
      total: 45.0,
      userId: 3,
    },
  });
  const order3 = await prisma.order.upsert({
    where: { id: 3 },
    update: {},
    create: {
      isComplete: true,
      total: 20.0,
      userId: 6,
    },
  });
  const order4 = await prisma.order.upsert({
    where: { id: 4 },
    update: {},
    create: {
      isComplete: false,
      total: 50.0,
      userId: 5,
    },
  });

  // Create orderProducts
  const order_Product1 = await prisma.orderProduct.upsert({
    where: { id: 1 },
    update: {},
    create: {
      quantity: 1,
      orderId: 1,
      productId: 1,
    },
  });
  const order_Product2 = await prisma.orderProduct.upsert({
    where: { id: 2 },
    update: {},
    create: {
      quantity: 1,
      orderId: 2,
      productId: 4,
    },
  });
  const order_Product3 = await prisma.orderProduct.upsert({
    where: { id: 3 },
    update: {},
    create: {
      quantity: 3,
      orderId: 3,
      productId: 3,
    },
  });
  const order_Product4 = await prisma.orderProduct.upsert({
    where: { id: 4 },
    update: {},
    create: {
      quantity: 2,
      orderId: 4,
      productId: 2,
    },
  });
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
