const express = require('express');
const router = express.Router();
const forms = require('../models/formsModel');

/* GET users listing. */
router.post('/form-i-1/student/:studentId', function(req, res) {
    // checking if all parameters are present since all of them are needed,
    // to complete the form I-1 from student's perspective.
    let studentId = req.params.studentId;
    let allParamsPresent = true;
    let paramKeys = Object.keys(req.body);

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
        console.log(formI1Student);
        formI1Student.save(err => {
            console.log(err);
        })
    }

    res.send({ success: allParamsPresent });
});

module.exports = router;
