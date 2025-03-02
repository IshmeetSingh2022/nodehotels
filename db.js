const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection failed:', err));

const db = mongoose.connection;

db.on('error', (err) => console.error('Database error:', err));
db.on('disconnected', () => console.log('Database disconnected'));

module.exports = db;
