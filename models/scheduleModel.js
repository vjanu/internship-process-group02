const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

let scheduleSchema = mongoose.Schema({
    // following are filled by student.
    StudentId: String,
    StudentEmails: Array,
    VivaDate: Date,
    Location: String
});


let scheduleModel = mongoose.model('schedule', scheduleSchema);

module.exports = { scheduleModel };