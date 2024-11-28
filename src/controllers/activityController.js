const { Activity } = require('../models');
const { generateUniqueAccessCode } = require('../utils/helpers');

exports.createActivity = async (req, res) => {
  try {
    const { description, startTime, endTime } = req.body;
    const accessCode = generateUniqueAccessCode();

    const activity = await Activity.create({
      description,
      accessCode,
      startTime,
      endTime,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

