const mongoose = require('mongoose');

const connString = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/softuni-booking';

module.exports = async (app) => {
    try {
        await mongoose.connect(connString);

        console.log('Database connected successfully.');
    } catch (err) {
        console.log('Error occured! Could not initialize database!');
        console.error(err.message);
        process.exit(1);
    }
};