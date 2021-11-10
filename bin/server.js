/** @format */
const express = require("express");
const app = require("../app");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });

const PORT = process.env.PORT || 5550;

const dataBase = async () => {
  try {
    const { DB_URL } = process.env;

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
dataBase();

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
