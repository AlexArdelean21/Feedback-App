const crypto = require('crypto');

exports.generateUniqueAccessCode = () => {
  // Generate a 6-character alphanumeric code
  return crypto.randomBytes(3).toString('hex');
};
