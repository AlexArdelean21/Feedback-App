const crypto = require('crypto');
const { Activity } = require('../models');

//Generates a 6-character alphanumeric access code.
//Avoids confusing characters like '0', 'O', 'I', and 'l'.

exports.generateUniqueAccessCode = async () => {
  let accessCode;
  let isUnique = false;

  while (!isUnique) {
    accessCode = crypto.randomBytes(3).toString('hex').replace(/[0OlI]/g, '');
    const existingActivity = await Activity.findOne({ where: { accessCode } });
    if (!existingActivity) {
      isUnique = true;
    }
  }

  return accessCode.toUpperCase(); // Converts to uppercase for consistency
};
