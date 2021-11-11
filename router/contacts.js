/** @format */

const express = require("express");
const { creatPost, creatPatch } = require("../helpers/schema");
const { validate } = require("../helpers/validate");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model/index");
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
  const id = parseInt(req.params.id);

  try {
    const result = await Contacts.findById(id);
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
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    return res.status(200).send(allContacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contactId = await getContactById(req.params.id);
    if (!contactId) res.status(404).send({ message: "Not found" });
    return res.status(200).send(contactId);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate(creatPost), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!(name && email && phone))
      return res.status(400).send({ message: "missing required name field" });
    const contactAdd = await addContact(req.body);
    return res.status(201).send(contactAdd);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactDel = await removeContact(contactId);

    if (!contactDel) res.status(404).send({ message: "Not found" });
    return res.status(200).send({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", validate(creatPatch), async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactPatch = await updateContact(contactId, req.body);
    if (!contactPatch) res.status(404).send({ message: "Not found" });
    return res.status(200).send(contactPatch);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
