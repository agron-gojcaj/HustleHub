const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/register', registerUser);
router.post('/login', authUser);

// @route  GET /api/auth/me
// @desc   Get user data
// @access Private
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;