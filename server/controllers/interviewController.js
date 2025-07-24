const Interview = require('../models/Interview');

exports.createInterview = async (req, res) => {
  const { application, date, time, type, notes } = req.body;
  const interview = new Interview({
    user: req.user._id,
    application,
    date,
    time,
    type,
    notes
  });
  const saved = await interview.save();
  res.status(201).json(saved);
};

exports.getInterviews = async (req, res) => {
  const interviews = await Interview.find({ 
    user: req.user._id,
    application: req.query.application
  });
  res.json(interviews);
};

exports.updateInterview = async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  if (!interview || interview.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Interview not found or unauthorized' });
  }
  Object.assign(interview, req.body);
  const updated = await interview.save();
  res.json(updated);
};

exports.deleteInterview = async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  if (!interview || interview.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Interview not found or unauthorized' });
  }
  await interview.remove();
  res.json({ message: 'Interview deleted' });
};
