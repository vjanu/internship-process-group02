const express = require('express');
const router = express.Router();
const internshipManager = require('../models/intershipManagerModel');
const randomize = require('randomatic');
const forms = require('../models/formsModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Add new supervisor. */
router.post('/add-internship-manager', function (req, res) {
    // checking if all parameters are present since all of them are needed,

    let allParamsPresent = true;
    let paramKeys = Object.keys(req.body);

    for (let i = 0; i < paramKeys.length; i++) {
        let key = paramKeys[i];
        let param = req.body[key];

        if (param == '' || param == undefined) {
            allParamsPresent = false;
            break;
        }
    }


    if (allParamsPresent) {
        let sp = internshipManager.InternshipManagerModel({
            InternshipManagerId: randomize('A0', 5),
            InternshipManagerName: req.body.InternshipManagerName,
            InternshipManagerEmail: req.body.InternshipManagerEmail,
            InternshipManagerPassword: req.body.InternshipManagerPassword,
        });

        sp.save(err => {
            console.log(err);
        })
    }

    res.send({
        success: allParamsPresent
    });
});

module.exports = router;
