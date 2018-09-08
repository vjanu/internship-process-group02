const express = require('express');
const router = express.Router();
const forms = require('../models/formsModel');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/d', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET student home page. */
router.get('/student', function (req, res, next) {
  res.render('Student_dashboard', { title: 'Express' });
});

router.get('/form-i-1/:studentId', function(req, res, next) {
  forms.formI1Model.find({}, { _id: 0, __v: 0 }, (err, data) => {
      if (err) {
        res.status(500).send({ success: false, message: 'error.'  });
      }
      else {
        res.status(200).send({ success: true, data: data });
        console.log('hello');
      }
  });
});


module.exports = router;
