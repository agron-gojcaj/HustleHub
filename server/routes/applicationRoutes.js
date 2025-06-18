const express = require('express');
const router = express.Router();
const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');
const Application = require('../models/Application');
const protect = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createApplication)
  .get(protect, getApplications);

router.route('/:id')
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

router.get('/', protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error'});
  }
});

module.exports = router;
