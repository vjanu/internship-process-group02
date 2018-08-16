const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

let formI1Schema = mongoose.Schema({
    // following are filled by student.
    StudentId: String,
    StudentName: String,
    StudentAddress: String,
    StudentHomePhone: Number,
    StudentMobilePhone: Number,
    StudentEmails: Array,
    Year: Number,
    Semester: Number,
    CGPA: Number,

    // following are filled by supervisor.
    EmployerName: String,
    EmployerAddress: String,
    SupervisorName: String,
    SupervisorPhone: Number,
    SupervisorTitle: String,
    SupervisorEmail: String,
    InternshipStart: Date,
    InternshipEnd: Date,
    WorkHoursPerWeek: Number
});

let formI1Model = mongoose.model('FormI1', formI1Schema);

module.exports = { formI1Model };
