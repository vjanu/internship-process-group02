const express = require('express');
const router = express.Router();

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


module.exports = router;
