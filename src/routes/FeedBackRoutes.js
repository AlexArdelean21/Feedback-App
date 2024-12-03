const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedBackController');

router.post('/', feedbackController.submitFeedback);
router.get('/activity/:activityId', feedbackController.getFeedbackByActivityId); // New route to get feedback for an activity

module.exports = router;
