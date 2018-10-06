const db = require('./mongodb').db;
const mongoose = require('./mongodb').mongoose;   // connection is already established @mongodb.js file.

let formI1Schema = mongoose.Schema({
    // following are filled by student.
    StudentId: String,
    StudentName: String,
    StudentAddress: String,
    StudentHomePhone: String,
    StudentMobilePhone: String,
    StudentEmails: Array,
    Year: Number,
    Semester: Number,
    CGPA: String,
    AssignedSupervisor: String,

    // following are filled by supervisor.
    EmployerName: String,
    EmployerAddress: String,
    SupervisorName: String,
    SupervisorPhone: String,
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


let formI5Schemax = mongoose.Schema({
    // following are filled by Supervisor.
    StudentId: String,
    StudentName: String,
    EmployerName: String,
    SupervisorName: String,
    Contract: String,
    VolumeOfWork: Number,
    AnalyticalAbility: Number,
    AbilityToResolve: Number,
    Accuracy: Number,
    Pressure: Number,
    Oral: Number,
    Written: Number,
    Thinking: Number,
    Learn: Number,
    Effective: Number,
    Initiatives: Number,
    Flexible: Number,
    Active: Number,
    Attitude: Number,
    Team: Number,
    Deligence: Number,
    Responsibility: Number,
    Positive: String,
    Personal: String,
    Needs: String,
    Suggest: String,
    Appropriateness: String,
    Other: String,
    Overall : Number,
    External: String,
    Date: String  
});

let formI1Model = mongoose.model('FormI1', formI1Schema);
let formI3Model = mongoose.model('FormI3', formI3Schema);
let formI3DiaryModel = mongoose.model('FormI3Diary', formI3DiarySchema);
let formI5Model = mongoose.model('FormI5', formI5Schemax);

module.exports = { formI1Model, formI3Model, formI3DiaryModel, formI5Model };