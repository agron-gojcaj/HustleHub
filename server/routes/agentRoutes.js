const express = require('express');
const router = express.Router();
const { createAgent } = require('../controllers/agentController');

router.route('/agent')
    .post(createAgent);

module.exports = router;