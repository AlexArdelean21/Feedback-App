const { Feedback, Activity } = require('../models');

exports.submitFeedback = async (req, res) => {
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

    const feedback = await Feedback.create({
      emotion,
      activityId: activity.id,
    });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

