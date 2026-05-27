const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async () => {
    if (database) {
        return database;
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        database = client.db('cse341db');
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

 const getDb = () => {
    return database;
};

module.exports = {
    initDb,
    getDb
}

