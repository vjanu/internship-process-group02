const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/internships';

// connect to database.
mongoose.connect(url);
// opt to use Global Promise library.
mongoose.Promise = global.Promise;
// connection for us to use.
const db = mongoose.connection;
// to get errors.
db.on('error', console.error.bind(console, 'DB Error: '));

module.exports = { db, mongoose };