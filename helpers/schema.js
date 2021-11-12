/** @format */

const Joi = require("joi");

creatPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

creatPatch = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { creatPost, creatPatch, updateFavorite };
