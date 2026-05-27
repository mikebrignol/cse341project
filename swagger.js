const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 API',
    description: 'My REST API'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger.json';

const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);