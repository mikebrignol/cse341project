const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 API',
    description: 'My REST API'
  },
  host: 'cse341project-4acs.onrender.com',
  servers: [
    {
      url: 'https://cse341project-4acs.onrender.com'
    }
  ],
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/items.js', './routes/brands.js'];

const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);