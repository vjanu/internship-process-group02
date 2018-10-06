const express = require('express');
const router = express.Router();
const scheduleImpl = require('../impl/scheduleImpl');
const Schedule = require('../models/scheduleModel').scheduleModel;

/* GET scheduled viva sessions. */
router.get('/both', (req, res) => {
    let grouped = { scheduled: [], all: [] };
    scheduleImpl.getAllFormI3Submissions()
        .then(resolve => { 
            grouped.all = resolve;
        })
        .then(() => {
            scheduleImpl.findAllScheduledVivaSessions()
                .then(sessions => { 
                    grouped.scheduled = sessions; 
                })
                .then(() => {
                    res.status(200).send(grouped);  // preferred response.
                })
                .catch(err => { 
                    res.status(400).send(err); 
                })
        })
        .catch(err => { 
            res.status(400).send(err); 
        })
});

// testing the method.
router.get('/:email/send', (req, res) => {
    const mailer = require('../impl/scheduleImpl').notifyVivaScheduleViaEmail;

    if (mailer(req.params.email, '', '')) {
        res.status(200).send('Email sent');
    }
    else {
        res.status(400).send('Email not sent');
    }
})

// add a session.
router.post('/', (req, res) => {
    let session = Schedule({
        StudentId: req.body.studentId,
        StudentEmails: req.body.emails,
        VivaDate: req.body.date,
        Location: req.body.location
    });

    session.save(err => {
        if (err) {
            res.status(400).send(false);
        }
        else {
            res.status(200).send(true);
        }
    })
})

module.exports = router;
