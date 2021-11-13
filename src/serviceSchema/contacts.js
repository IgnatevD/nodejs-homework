/** @format */

const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const ContactsShema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 70,
    required: [true, "Name is required"],
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
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Contacts = mongoose.model("Contacts", ContactsShema);

module.exports = Contacts;
