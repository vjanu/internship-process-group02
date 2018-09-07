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

let formI3Schema = mongoose.Schema({
    // following are filled by student.
    StudentName: String,
    StudentId: String,
    StudentAddress: String,
    StudentPhone: Number,
    StudentEmails: Array,
    Specialization: String,
    InternshipTitle: String,
    From: String,
    To: String
});

let formI3DiarySchema = mongoose.Schema({
    // following are filled by student.
    StudentId: String,
    TrainingDescription: String,
    TrainingParty: String,
    From: String,
    To: String
});

let formI1Model = mongoose.model('FormI1', formI1Schema);
let formI3Model = mongoose.model('FormI3', formI3Schema);
let formI3DiaryModel = mongoose.model('FormI3Diary', formI3DiarySchema);

module.exports = { formI1Model, formI3Model, formI3DiaryModel };
