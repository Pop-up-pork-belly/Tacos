require("dotenv").config();
const http = require("http");
const app = require("./app");
const client = require("./db/client");
const { rebuildDB } = require("./db/seedData");

const PORT = process.env["PORT"] ?? 3001;

// Heroku below:

// app.listen(process.env.PORT);

// let port = process.env.PORT;
// if (port === null || port == "") {
//   port = 8000;
// }
// app.listen(port);

const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Server is listening on PORT:${PORT}`);

  client.connect();
  try {
    await rebuildDB();
    console.log("Database Seeding completed");
  } catch (error) {
    console.error("Error seeding", error);
  }
});
