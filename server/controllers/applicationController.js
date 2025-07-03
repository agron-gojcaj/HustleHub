const Application = require('../models/Application');

exports.createApplication = async (req, res) => {
  try {
    const { company, position, jobLink, status, appliedDate, notes } = req.body;
    if (!company || !position) {
      return res.status(400).json({ message: 'Company and position are required' });
    }
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
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    Object.assign(application, req.body);
    const updated = await application.save();
    res.json(updated);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: 'Invalid application ID' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await application.deleteOne();
    res.json({ message: 'Application deleted' });
  } catch (err) {
    // Check for invalid ObjectId
    if (err.name === "CastError") {
      return res.status(400).json({ message: 'Invalid application ID' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};