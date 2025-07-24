const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  const { name, email, company, linkedin, notes, associatedApplication } = req.body;
  const contact = new Contact({
    user: req.user._id,
    name,
    email,
    company,
    linkedin,
    notes,
    associatedApplication
  });
  const saved = await contact.save();
  res.status(201).json(saved);
};

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find({ 
    user: req.user._id,
    associatedApplication: req.query.associatedApplication
  });
  res.json(contacts);
};

exports.updateContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact || contact.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Contact not found or unauthorized' });
  }
  Object.assign(contact, req.body);
  const updated = await contact.save();
  res.json(updated);
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact || contact.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Contact not found or unauthorized' });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};