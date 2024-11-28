const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedBackController');

router.post('/', feedbackController.submitFeedback);
// Add other routes as needed

module.exports = router;
