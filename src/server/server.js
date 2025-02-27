/** @format */
const app = require("../app");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5500;
const DB_URL = process.env.DB_URL;

const dataBaseNew = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

dataBaseNew();

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
