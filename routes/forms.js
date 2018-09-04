const express = require('express');
const router = express.Router();
const forms = require('../models/formsModel');

/* POST Fomr I-1 data: Student */
router.post('/form-i-1/student/:studentId', (req, res) => {
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
        let formI1Student = forms.formI1Model({
            StudentId: req.body.studentId,
            StudentName: req.body.name,
            StudentAddress: req.body.address,
            StudentHomePhone: req.body.homePhone,
            StudentMobilePhone: req.body.mobilePhone,
            StudentEmails: req.body.emailAddresses,
            Year: req.body.year,
            Semester: req.body.semester,
            CGPA: req.body.cgpa
        });

        formI1Student.save(err => { console.log(err); });
    }

    res.send({ success: allParamsPresent });
});

/* POST Fomr I-1 data: Supervisor */
router.post('/form-i-1/supervisor/:studentId', (req, res) => {
    // we store data in the record that already exists under the student id.
    let studentId = req.params.studentId;

    // see if an entry actually exists.
    forms.formI1Model.findOne({ studentId: studentId }, (err, record) => {
        console.log(record);

        if (record) {
            // insert supervisor's data into existing entry/record.
            // we save this record back to db, essentially replacing the existing record.
        }
    });
});

/* GET all Form I-1 */
router.get('/form-i-1', (req, res) => {
    forms.formI1Model.find({}, { _id: 0, _v: 0 }, (err, data) => {
        if (data) {
            res.send({ success: true, data: data });
        }
        else {
            res.send({ success: false, data: err });
        }
    })
});



module.exports = router;
