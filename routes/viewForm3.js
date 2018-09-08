const express = require('express');
const router = express.Router();
const forms = require('../models/formsModel');



// /* GET Form I-3 of a specific student */
// router.get('/form-i-3', (req, res) => {
//   let studentId = req.params.studentId;
//   console.log(studentId);
//   getFormI3Diary(studentId, req, res);
// });




router.get('/form-i-3', function (req, res, next) {
  forms.formI3DiaryModel.find().exec().then((data) => {
      res.send(data);
      console.log('abcccc');
  }).catch((err) => {
      res.send("Error");
  })
});


/* POST Daily Diary: Student */
router.post('/viewForm3_update/diary/', function(req, res) {
  let studentId = req.params.studentId;
  let allParamsPresent = true;
  let paramKeys = Object.keys(req.body);


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
module.exports = router;