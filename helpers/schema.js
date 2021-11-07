/** @format */

const Joi = require("joi");

const creatPost = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

const creatPatch = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.number(),
});

module.exports = { creatPost, creatPatch };
