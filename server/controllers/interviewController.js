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
  try {
    const updated = await Interview.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // also checks ownership
      req.body,
      { new: true, runValidators: true } // returns updated doc, validates schema
    );
    if (!updated) {
      return res.status(404).json({ message: 'Interview not found or unauthorized' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview || interview.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Interview not found or unauthorized" });
    }
    await Interview.findByIdAndDelete(req.params.id);
    res.json({ message: "Interview deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
