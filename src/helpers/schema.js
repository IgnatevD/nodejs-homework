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

registrUsers = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

loginUsers = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

updateUsers = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  creatPost,
  creatPatch,
  updateFavorite,
  registrUsers,
  updateUsers,
  loginUsers,
};
