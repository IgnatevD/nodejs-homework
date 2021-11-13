/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsShema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 70,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
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
