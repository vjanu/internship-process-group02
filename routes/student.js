const express = require('express');
const router = express.Router();
const supervisor = require('../models/supervisorModel');
const randomize = require('randomatic');
const forms = require('../models/formsModel');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/d', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET student home page. */
router.get('/form-i-1/:studentId', function (req, res) {
    forms.formI1Model.find({
        StudentId: req.params.studentId,
    }, {
        _id: 0,
        __v: 0
    }, (err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong.'
            });
        } else if (data.length === 0) {
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


module.exports = router;
