const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/register', registerUser);
router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;