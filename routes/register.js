const express = require('express');
const router = express.Router();
const regForm = require('../models/registerModel');

/* POST register data: Student */
router.post('/info/student/:nic', function(req, res) {
    let nic = req.params.nic;
    let allParamsPresent = true;
    let paramKeys = Object.keys(req.body);

   
    for (let i = 0; i < paramKeys.length; i++) {
        let key = paramKeys[i];
        let param = req.body[key];

        if (param == '' || param == undefined) { allParamsPresent = false; break; }
    }

    if (allParamsPresent) {
        let registerData = regForm.registerModel({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            NIC: req.body.nic,
            RegistrationNo: req.body.regno,
            Department: req.body.dept,
            AcademicYear: req.body.year,
            Email: req.body.email,
            Password: req.body.password
        });

        registerData.save(err => { 
            console.log(err); 
        });
    }
    
    res.send({ success: allParamsPresent });
});








module.exports = router;
