require('dotenv').config();

module.exports = {
  development: {
    username: 'feedback_user', 
    password: 'faraparola',  
    database: 'feedback_app',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'feedback_user',
    password: 'faraparola',
    database: 'feedback_app',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'feedback_user',
    password: 'faraparola',
    database: 'feedback_app',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
