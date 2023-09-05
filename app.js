require("dotenv").config();
const express = require("express");
const app = express();
const apiRouter = require("./api");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use("/api", apiRouter);
app.use(morgan("dev"));
app.use(cors());

app.use((req, res) => {
  res.status(404).send({
    message: "NOT FOUND",
  });
});

module.exports = app;
