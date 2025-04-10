const Application = require('../models/Application');

exports.createApplication = async (req, res) => {
  const { company, position, jobLink, status, appliedDate, notes } = req.body;
  const application = new Application({
    user: req.user._id,
    company,
    position,
    jobLink,
    status,
    appliedDate,
    notes
  });
  const saved = await application.save();
  res.status(201).json(saved);
};

exports.getApplications = async (req, res) => {
  const applications = await Application.find({ user: req.user._id });
  res.json(applications);
};

exports.updateApplication = async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application || application.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Application not found or unauthorized' });
  }
  Object.assign(application, req.body);
  const updated = await application.save();
  res.json(updated);
};

exports.deleteApplication = async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application || application.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Application not found or unauthorized' });
  }
  await application.remove();
  res.json({ message: 'Application deleted' });
};