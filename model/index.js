/** @format */

const fs = require("fs/promises");
const path = require("path");
const Contacts = require("../service");

const contacts = path.join(__dirname, "/contacts.json");

const getDB = async (req, res, next) => {
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
};
const listContacts = async () => {
  const readFileContacts = await fs.readFile(contacts, "utf-8");
  console.log(Contacts.find());
  return JSON.parse(readFileContacts);
};

const getContactById = async (contactId) => {
  const listContact = await listContacts();
  const contact = listContact.find((el) => el.id === parseInt(contactId));
  return contact;
};

const removeContact = async (contactId) => {
  const listContact = await listContacts();
  const newListContact = await listContact.filter(
    (el) => el.id !== parseInt(contactId)
  );
  const contact = listContact.find((el) => el.id === parseInt(contactId));
  await fs.writeFile(contacts, JSON.stringify(newListContact));
  return contact;
};

const addContact = async (body) => {
  const listContact = await listContacts();
  const id = listContact.length
    ? listContact[listContact.length - 1].id + 1
    : 1;
  const newListContacts = [...listContact, { id, ...body }];

  await fs.writeFile(contacts, JSON.stringify(newListContacts));
  return newListContacts;
};

const updateContact = async (contactId, body) => {
  const listContact = await listContacts();
  const contact = listContact.find((el) => el.id === parseInt(contactId));
  if (!contact) return false;

  const updateContact = { ...contact, ...body };
  const delContact = await listContact.filter(
    (el) => el.id !== updateContact.id
  );
  const newListContacts = [...delContact, updateContact];

  await fs.writeFile(contacts, JSON.stringify(newListContacts));

  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getDB,
};
