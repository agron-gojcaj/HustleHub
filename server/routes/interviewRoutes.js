const express = require('express');
const router = express.Router();
const {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview
} = require('../controllers/interviewController');
const protect = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createInterview)
  .get(protect, getInterviews);

router.route('/:id')
  .put(protect, updateInterview)
  .delete(protect, deleteInterview);

module.exports = router;
