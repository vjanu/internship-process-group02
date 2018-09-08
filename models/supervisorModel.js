const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

let supervisorSchema = mongoose.Schema({
    SupervisorId: String,
    SupervisorName: String,
    SupervisorEmail: String,
    SupervisorPassword: String,
});

let supervisorModel = mongoose.model('Supervisor', supervisorSchema);

module.exports = { supervisorModel };
