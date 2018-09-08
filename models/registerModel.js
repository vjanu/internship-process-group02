const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

let registerSchema = mongoose.Schema({
    // following are filled by student.
    FirstName: String,
    LastName: String,
    NIC: String,
    RegistrationNo: String,
    Department: String,
    AcademicYear: Number,
    Email: String
  
});



let registerModel = mongoose.model('register', registerSchema);

module.exports = { registerModel };
