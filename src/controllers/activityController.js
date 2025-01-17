const { body, validationResult } = require('express-validator');
const { Activity } = require('../../models');
const { generateUniqueAccessCode } = require('../utils/helpers');

exports.createActivity = [
  // Validation middleware
  body('description').notEmpty().withMessage('Description is required'),
  body('startTime').isISO8601().withMessage('Valid start time is required'),
  body('endTime').isISO8601().withMessage('Valid end time is required'),

  // Create activity controller function
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description, startTime, endTime } = req.body;

      // Ensure startTime is before endTime
      if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: 'Start time must be before end time' });
      }

      const accessCode = await generateUniqueAccessCode();
      const activity = await Activity.create({
        description,
        accessCode: String(accessCode), // Ensure it's explicitly cast to a string
        startTime,
        endTime,
      });

      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { description, startTime, endTime } = req.body;

    // Ensure startTime is before endTime
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ error: 'Start time must be before end time' });
    }

    const [updated] = await Activity.update(
      { description, startTime, endTime },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const deleted = await Activity.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
