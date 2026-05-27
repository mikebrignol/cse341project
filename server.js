const express = require('express');
const app = express();
require('dotenv').config();

const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('CSE341 API is running');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/items', require('./routes/items'));

const PORT = process.env.PORT || 3000;

mongodb.initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
