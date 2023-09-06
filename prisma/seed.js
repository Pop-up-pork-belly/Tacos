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

  const category1 = await prisma.productCategory.upsert({
    where: { name: "test1" },
    update: {},
    create: {
      id: 11,
      name: "test1",
    },
  });
  const fcategory2 = await prisma.productCategory.upsert({
    where: { name: "test2" },
    update: {},
    create: {
      id: 6,
      name: "test2",
    },
  });
  const category3 = await prisma.productCategory.upsert({
    where: { name: "test3" },
    update: {},
    create: {
      id: 7,
      name: "test3",
    },
  });
  const category4 = await prisma.productCategory.upsert({
    where: { name: "test4" },
    update: {},
    create: {
      id: 8,
      name: "test4",
    },
  });
  const category5 = await prisma.productCategory.upsert({
    where: { name: "test5" },
    update: {},
    create: {
      id: 9,
      name: "test5",
    },
  });
  const category6 = await prisma.productCategory.upsert({
    where: { name: "test6" },
    update: {},
    create: {
      id: 10,
      name: "test6",
    },
  });

  // Create Products
  const tenzShirt = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Faze Clan 2024 Diamond Jersey",
      description: "Newest Jersey for our supporters",
      price: 60,
      image: "https://shop.fazeclan.com/cdn/shop/products/Jersey-_0000_Front-min_700x.jpg?v=1677657080",
      categoryId: 1,
    },
  });
  const cloud9Shirt = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "2023 Cloud9 Official Summer Jersey",
      description: "League of Legends Edition",
      price: 80,
      image: "https://store.cloud9.gg/cdn/shop/files/LOL_Front_400x.png?v=1685159158",
      categoryId: 2,
    },
  });
  const partyShirt = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "NAVI x PUMA 2023 Pro Kit",
      description: "Gameday Jersey",
      price: 50,
      image: "https://shop.navi.gg/files/resized/products/navi67131-2.400x400.png.webp",
      categoryId: 3,
    },
  });
  const eSportsShirt = await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "100T 2023 Glacial Jersey",
      description: "Gameday Jersey",
      price: 100,
      image: "https://100thieves.com/cdn/shop/files/100thieves_JERSEY_1x1_001.jpg?v=1687306724&width=1280",
      categoryId: 4,
    },
  });
  const frenchFriesShirt = await prisma.product.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "2023 Cloud9 Official Summer Jersey",
      description: "CSGO & SSBM Pro Edition",
      price: 50,
      image: "https://store.cloud9.gg/cdn/shop/files/BC_Front_400x.png?v=1690921901",
      categoryId: 11,
    },
  });

  const testNav = await prisma.product.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Bape X Faze Clan",
      description: "Game Tee",
      price: 150,
      image: "https://shop.fazeclan.com/cdn/shop/products/jersey-min_700x.png?v=1676880145",
      categoryId: 6,
    },
  });

  const faze = await prisma.product.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: "NAVI x PUMA 2022 T-Shirt",
      description: "Last years supporter T-Shirt",
      price: 30,
      image: "https://shop.navi.gg/files/resized/products/navi54542.400x400.png.webp",
      categoryId: 7,
    },
  });

  const cloud = await prisma.product.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: "2023 Cloud9 Official Summer Jersey",
      description: "VALORANT Edition",
      price: 60,
      image: "https://store.cloud9.gg/cdn/shop/files/VAL_Front_1_400x.png?v=1685159919",
      categoryId: 8,
    },
  });

  const oneHundredT = await prisma.product.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: "100T 2024 Primary Jersey",
      description: "Primary Jersey for the 2023 season",
      price: 70,
      image: "https://100thieves.com/cdn/shop/products/100Thieves_Jersey_001copy-min.jpg?v=1673292429&width=1280",
      categoryId: 9,
    },
  });

  const fazeAt = await prisma.product.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: "Atlanta Faze Black ",
      description: "2023 Pro Jersey",
      price: 60,
      image: "https://shop.fazeclan.com/cdn/shop/products/Faze-ATL-_0005_Front-min_600x.jpg?v=1674114905",
      categoryId: 10,
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
      productId: 11,
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
