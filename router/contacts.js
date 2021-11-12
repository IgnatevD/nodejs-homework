/** @format */

const express = require("express");
const { creatPost, creatPatch, updateFavorite } = require("../helpers/schema");
const { validate } = require("../helpers/validate");
const Contacts = require("../serviceSchema");

const router = express.Router();

router.get("/contacts", async (req, res, next) => {
  try {
    const results = await Contacts.find();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/contacts/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const results = await Contacts.findById(id);
    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: results },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contacnt id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/contacts", validate(creatPost), async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await Contacts.create({ name, email, phone });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Contacts.findByIdAndRemove({ _id: id });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contacnt id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/contacts/:id", validate(creatPatch), async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await Contacts.findByIdAndUpdate(
      { _id: id },
      { name, email, phone },
      {
        new: true,
      }
    );
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch(
  "/contacts/:id/favorite",
  validate(updateFavorite),
  async (req, res, next) => {
    const { id } = req.params;
    const { favorite } = req.body;

    try {
      const result = await Contacts.findByIdAndUpdate(
        { _id: id },
        { favorite },
        {
          new: true,
        }
      );
      if (result) {
        res.json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found contact id: ${id}`,
          data: "Not Found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

module.exports = router;
