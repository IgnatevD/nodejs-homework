/** @format */

const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsShema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 70,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    minlength: 5,
    maxlength: 13,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("Contacts", ContactsShema);

module.exports = Contacts;
