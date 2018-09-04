const express = require('express');
const router = express.Router();
const forms = require('../models/formsModel');

/* POST Fomr I-1 data: Student */
router.post('/form-i-1/student/:studentId', (req, res) => {
    saveFormI1StudentPersepective(req, res);
});

/* POST Fomr I-1 data: Supervisor */
router.post('/form-i-1/supervisor/:studentId', (req, res) => {
    saveFormI1SupervisorPerspective(req, res);
});

/* GET all Form I-1 */
router.get('/form-i-1', (req, res) => {
    getAllFormI1('',req, res);
});

/* GET Form I-1 of a specific student */
router.get('/form-i-1/student/:studentId', (req, res) => {
    let studentId = req.params.studentId;
    console.log(studentId);
    getAllFormI1(studentId, req, res);
});



/*
 * This will create a new record in the DB under student's registration number and,
 * insert the data filled by the student in the Form I-1.
 * Note that this same record has to be modified when entering data of provided by,
 * the supervisor for this student.
 * 
 * A new record must be created for the student only if all theh details are present.
 * 
 * The response(using res object) must be as follows:-
 *      { success: true | false, data: data }
 *      
 *      success will indicate if necessary data was collected successfully or not.
 *      
 *      data will contain any data produced as a result of any execution in the function,
 *      or may contain any error message as well.
 * 
 * @param req:
 *      req object provided by Express's router which contains everything related to the,
 *      API request.
 * 
 * @param res:
 *      res object provided by Express's router which we use to send the response back,
 *      to the caller.
 */ 
function saveFormI1StudentPersepective(req, res) {
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
}

/*
 * 
 */
function saveFormI1SupervisorPerspective(req, res) {
}

/*
 * This will get all the records or a specific under FormI1 model in the DB.
 * When the studentId is not present, this will find all the records.
 * We remove the _igid and __v attributes from the results since we don't really need them anyways.
 * 
 * @param studentId"
 *      student registration number of the student whose form we are looking for.
 *      leave this as an empty string if all the entries are needed.
 * @param req:
 *      req object provided by Express's router which contains everything related to the,
 *      API request.
 * 
 * @param res:
 *      res object provided by Express's router which we use to send the response back,
 *      to the caller.
 */
function getAllFormI1(studentId, req, res) {
    searchCondition = studentId ? { StudentId: studentId } : {};

    forms.formI1Model.find(searchCondition, { _id: 0, _v: 0 }, (err, data) => {
        if (data) {
            res.send({ success: true, data: studentId ? data[0] : data });
            // if we provide a student id, we expect just one entry. But since we run find(),
            // method, we will get an array even if it's just one record, therefore we respond,
            // with a non-array object if the function caller is expecting a single result by providing,
            // a student id.
        }
        else {
            res.send({ success: false, data: err });
        }
    });
}


module.exports = router;
