const express = require('express');
const router = express.Router();
const forms = require('../models/formsModel');

/* POST Form I-3 data: Student */
router.post('/form-i-3/student/:studentId', function(req, res) {
    let studentId = req.params.studentId;
    let allParamsPresent = true;
    let paramKeys = Object.keys(req.body);

    // checking if all parameters are present since all of them are needed,
    // to complete the form I-1 from student's perspective.
    for (let i = 0; i < paramKeys.length; i++) {
        let key = paramKeys[i];
        let param = req.body[key];

        if (param == '' || param == undefined) { allParamsPresent = false; break; }
    }

    if (allParamsPresent) {
        let formI3Student = forms.formI3Model({
            StudentId: req.body.studentId,
            StudentName: req.body.name,
            StudentAddress: req.body.address,
            StudentPhone: req.body.contactNumber,
            StudentEmails: req.body.email,
            Specialization: req.body.spec,
            InternshipTitle: req.body.internshipTitle,
            From: req.body.from,
            To: req.body.to
        });

        formI3Student.save(err => { console.log(err); });
    }
    
    res.send({ success: allParamsPresent });
});

/* POST Daily Diary: Student */
router.post('/form-i-3/diary/', function(req, res) {
    let studentId = req.params.studentId;
    let allParamsPresent = true;
    let paramKeys = Object.keys(req.body);

    // checking if all parameters are present since all of them are needed,
    // to complete the form I-1 from student's perspective.
    for (let i = 0; i < paramKeys.length; i++) {
        let key = paramKeys[i];
        let param = req.body[key];

        if (param == '' || param == undefined) { allParamsPresent = false; break; }
    }

    if (allParamsPresent) {
        let formI3DiaryStudent = forms.formI3DiaryModel({
            StudentId: req.body.studentIdDiary,
            TrainingDescription: req.body.desc,
            TrainingParty: req.body.party,
            From: req.body.fromDiary,
            To: req.body.toDiary
        });

        formI3DiaryStudent.save(err => { console.log(err); });
    }
    
    res.send({ success: allParamsPresent });
});

router.get('/data/:studentId', function(req, res, next) {
    forms.formI3DiaryModel.find({StudentId:req.params.studentId}, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
          res.status(500).send({ success: false, message: 'error.'  });
        }
     else if (data.length === 0) {
            res.status(404).send({
                success: false,
                message: 'Invalid Student ID provided.'
            });
        } else {
            res.status(200).send({
                success: true,
                data: data
            });
        }
    });
});


/**
 * Get All form i-3 submitted student list
 * @author Tharindu
 */

router.get('/form-i-3/', function(req, res, next) {
    forms.formI3Model.find({}, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            res.status(500).send({ success: false, message: 'error.'  });
        }
        else if (data.length === 0) {
            res.status(404).send({
                success: false,
                message: 'Student data not found.'
            });
        } else {
            res.status(200).send({
                success: true,
                data: data
            });
        }
    });
});

/**
 * Get basic details of form i-3
 * @author Tharindu
 */
router.get('/form-i-3/:studentId', function(req, res, next) {
    forms.formI3Model.find({StudentId:req.params.studentId}, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            res.status(500).send({ success: false, message: 'error.'  });
        }
        else if (data.length === 0) {
            res.status(404).send({
                success: false,
                message: 'Student data not found.'
            });
        } else {
            res.status(200).send({
                success: true,
                data: data
            });
        }
    });
});





module.exports =  router ;
