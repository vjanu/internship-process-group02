const express = require('express');
const router = express.Router();
const supervisor = require('../models/supervisorModel');
const internshipManager = require('../models/intershipManagerModel');
const student = require('../models/registerModel');
const randomize = require('randomatic');
const forms = require('../models/formsModel');


router.get('/', function (req, res, next) {
    supervisor.supervisorModel.find().exec().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send("Error");
    })
});

router.post('/', function (req, res) {

    checkStudentExists(req, res);

});

function checkStudentExists(req, res) {
        student.registerModel.find({
            Email: req.body.userEmail,
            Password: req.body.userPassword
        }, {
            NIC: 0,
            Department: 0,
            AcademicYear: 0,
            Password: 0,
            __v: 0
        }, (err, data) => {
            if (err) {
                checkSupervisorExists(req, res);
            } else if (data.length === 0) {
                checkSupervisorExists(req, res);
            } else {
                res.status(200).send({
                    success: true,
                    info: data,
                    userType: "Student"
                });
            }
        });
}

function checkSupervisorExists(req, res) {
        supervisor.supervisorModel.find({
            SupervisorEmail: req.body.userEmail,
            SupervisorPassword: req.body.userPassword
        }, {
            _id: 0,
            __v: 0,
            SupervisorPassword: 0
        }, (err, data) => {
            if (err) {
                checkInternshipManagerExists(req, res);
            } else if (data.length === 0) {
                checkInternshipManagerExists(req, res);
            } else {
                res.status(200).send({
                    success: true,
                    info: data,
                    userType: "Supervisor"
                });
            }
        });
}

function checkInternshipManagerExists(req, res) {
    internshipManager.InternshipManagerModel.find({
        InternshipManagerEmail: req.body.userEmail,
        InternshipManagerPassword: req.body.userPassword
    }, {
        _id: 0,
        __v: 0,
        InternshipManagerPassword: 0
    }, (err, data) => {
        if (err) {
            res.status(404).send({
                success: false,
                info: "Not Found"
            });
        } else if (data.length === 0) {
            res.status(404).send({
                success: false,
                info: "Not Found"
            });
        } else {
            res.status(200).send({
                success: true,
                info: data,
                userType: "InternshipManager"
            });
        }
    });

}

module.exports = router;
