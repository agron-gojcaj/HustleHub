const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Application',
  },
  date: { type: Date, required: true },
  time: { type: String },
  type: { type: String, enum: ['Phone', 'Technical', 'On-site', 'HR', 'Other'], default: 'Other' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);