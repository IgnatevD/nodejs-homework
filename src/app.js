/** @format */

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./router/contacts");
const usersRouter = require("./router/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 100000 }));

require("./config/config");
app.use("/", usersRouter);
app.use("/", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
