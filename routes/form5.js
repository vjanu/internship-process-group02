const express = require('express');
 const router = express.Router();
 const forms = require('../models/formsModel');

 /* POST Form I-3 data: Student */
 router.post('/form-i-5/student/:studentId', function(req, res) {
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
         let formI5Student = forms.formI5Model({
             StudentId: req.body.studentId,
             StudentName: req.body.sname,
             EmployerName: req.body.ename,
             SupervisorName: req.body.supname,
             Contract: req.body.contract,
             VolumeOfWork: req.body.vow,
             AnalyticalAbility: req.body.ability,
             AbilityToResolve: req.body.resolve,
             Accuracy: req.body.acc,
             Pressure: req.body.press,
             Oral: req.body.oral,
             Written: req.body.write,
             Thinking: req.body.think,
             Learn: req.body.learn,
             Effective: req.body.effect,
             Initiatives: req.body.init,
             Flexible: req.body.flex,
             Active: req.body.act,
             Attitude: req.body.att,
             Team: req.body.team,
             Deligence: req.body.deli,
             Responsibility: req.body.resp,
             Positive: req.body.posit,
             Personal: req.body.persona,
             Needs: req.body.need,
             Suggest: req.body.sug,
             Appropriateness: req.body.appro,
             Other: req.body.oth,
             Overall: req.body.ver,
             External: req.body.extto,
             Date: req.body.date
         });

         formI5Student.save(err => { console.log(err); });
     }
     
     res.send({ success: allParamsPresent });
 });



 router.get('/data/:studentId', function(req, res, next) {
     forms.formI5Model.find({StudentId:req.params.studentId}, { _id: 0, __v: 0 }, (err, data) => {
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


router.get('/all', function(req, res, next) {
    forms.formI5Model.find({}, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            res.status(500).send({ success: false, message: 'error.'  });
        }
        else if (data.length === 0) {
            res.status(404).send({
                success: false,
                message: 'Student not found.'
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