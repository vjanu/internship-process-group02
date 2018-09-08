const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

let InternshipManagerSchema = mongoose.Schema({
    InternshipManagerId: String,
    InternshipManagerName: String,
    InternshipManagerEmail: String,
    InternshipManagerPassword: String,
});

let InternshipManagerModel = mongoose.model('InternshipManager', InternshipManagerSchema);

module.exports = { InternshipManagerModel };
