/** @format */

const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsShema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("Contacts", contactsShema);

module.exports = Contacts;
