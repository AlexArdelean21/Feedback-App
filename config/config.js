require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL', // Use DATABASE_URL for local development
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true', // Enable logging if DB_LOGGING is true
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Use DATABASE_URL for production
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true, // Enable SSL for hosted database
        rejectUnauthorized: false, // Avoid issues with self-signed certificates
      },
    },
    logging: false, // Disable logging for production
  },
};
