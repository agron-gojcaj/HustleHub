const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: { type: String, required: true },
  position: { type: String, required: true },
  jobLink: { type: String },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  appliedDate: { type: Date, default: Date.now, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);