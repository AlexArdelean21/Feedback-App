const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Feedback API',
      version: '1.0.0',
      description: 'API documentation for the Feedback Web Application',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Point to route files where Swagger annotations will be added
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
