const { body, validationResult } = require('express-validator');
const { Feedback, Activity } = require('../models');

exports.submitFeedback = [
  // Validation middleware
  body('emotion')
    .isIn(['smiley', 'frowny', 'surprised', 'confused'])
    .withMessage('Invalid emotion type'),
  body('activityAccessCode')
    .notEmpty()
    .withMessage('Activity access code is required'),

  // Submit feedback controller function
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { emotion, activityAccessCode } = req.body;

      // Find the activity using the access code
      const activity = await Activity.findOne({ where: { accessCode: activityAccessCode } });

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      // Check if the activity is active based on time
      const currentTime = new Date();
      if (currentTime < activity.startTime || currentTime > activity.endTime) {
        return res.status(400).json({ error: 'Activity is not active' });
      }

      // Prevent duplicate feedback within 10 seconds
      const lastFeedback = await Feedback.findOne({
        where: { activityId: activity.id, emotion },
        order: [['createdAt', 'DESC']],
      });

      if (lastFeedback && (currentTime - new Date(lastFeedback.createdAt)) < 10000) {
        return res.status(429).json({ error: 'Please wait before submitting the same feedback again' });
      }

      // Create the feedback
      const feedback = await Feedback.create({
        emotion,
        activityId: activity.id,
      });

      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getFeedbackByActivityId = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: { activityId: req.params.activityId },
      order: [['createdAt', 'ASC']],
    });

    if (feedbacks.length === 0) {
      return res.status(404).json({ error: 'No feedback found for this activity' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
