const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: { type: String, required: true },
  email: { type: String },
  company: { type: String },
  linkedin: { type: String },
  notes: { type: String },
  associatedApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);