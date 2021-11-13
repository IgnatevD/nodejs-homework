/** @format */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../serviceSchema/user");
require("dotenv").config();
const { registrUsers, updateUsers, loginUsers } = require("../helpers/schema");
const { validate } = require("../helpers/validate");
const secret = process.env.SECRET;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/login", validate(loginUsers), async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      email,
    },
  });
});

router.post("/signup", validate(registrUsers), async (req, res, next) => {
  const { username, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ username, email, subscription });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { token: null });
    return res.status(204).send("No Content");
  } catch (err) {
    next(err);
  }
});

router.get("/current", auth, async (req, res, next) => {
  try {
    return res
      .status(200)
      .send({ email: req.user.email, subscription: req.user.subscription });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
