const http = require("http");
const app = require("./app");
const client = require("./db/client");
const { rebuildDB } = require("./db/seedData");

const PORT = process.env["PORT"] ?? 3000;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Server is listening on PORT:${PORT}`);

  client.connect();
  try {
    await rebuildDB();
    console.log("Database Seeding completed");
  } catch (error) {
    console.error("Error seeding", Error);
  }
});
