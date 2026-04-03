const express = require('express');
const router = express.Router();

const {
  createContactWithFallback,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactsCount,
  validateContactData
} = require('./contactService');

// CREATE
router.post('/contact', async (req, res) => {
  const { fullName, dniNie, address, contactNumber } = req.body;

  const validation = validateContactData(req.body);
  if (!validation.isValid) {
    return res.status(400).json(validation);
  }

  const contact = await createContactWithFallback(req.body);
  res.json({ success: true, data: contact });
});

// GET ALL
router.get('/contacts', async (req, res) => {
  const contacts = await getContacts();
  res.json({ success: true, data: contacts });
});

// GET ONE
router.get('/contacts/:id', async (req, res) => {
  const contact = await getContactById(req.params.id);
  res.json({ success: true, data: contact });
});

// UPDATE
router.put('/contacts/:id', async (req, res) => {
  const contact = await updateContact(req.params.id, req.body);
  res.json({ success: true, data: contact });
});

// DELETE
router.delete('/contacts/:id', async (req, res) => {
  await deleteContact(req.params.id);
  res.json({ success: true });
});

module.exports = router;