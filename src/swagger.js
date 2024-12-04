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
        url: 'http://localhost:7000/api',
        description: 'Local development server',
      },
    ],
    components: {
      schemas: {
        Activity: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier of the activity',
            },
            description: {
              type: 'string',
              description: 'Description of the activity',
            },
            accessCode: {
              type: 'string',
              description: 'Unique access code for the activity',
            },
            startTime: {
              type: 'string',
              format: 'date-time',
              description: 'The start time of the activity',
            },
            endTime: {
              type: 'string',
              format: 'date-time',
              description: 'The end time of the activity',
            },
          },
          required: ['description', 'accessCode', 'startTime', 'endTime'],
        },
        Feedback: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier of the feedback',
            },
            emotion: {
              type: 'string',
              enum: ['smiley', 'frowny', 'surprised', 'confused'],
              description: 'The emotion feedback given by a student',
            },
            activityId: {
              type: 'string',
              description: 'The ID of the activity for which the feedback is given',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the feedback was created',
            },
          },
          required: ['emotion', 'activityId'],
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
