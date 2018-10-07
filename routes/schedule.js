const express = require('express');
const router = express.Router();
const scheduleImpl = require('../impl/scheduleImpl');
const Schedule = require('../models/scheduleModel').scheduleModel;

/** GET scheduled viva sessions. */
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

/** GET all scheduled sessions. */
router.get('/', (req, res) => {
    scheduleImpl.findAllScheduledVivaSessions()
        .then(sessions => {
            res.status(200).send(sessions);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

/** UPDATE a scheduled session */
router.put('/:studentId/session', (req, res) => {
    // get the existing entry from database.
    scheduleImpl.getScheduleOfSpecificStudent(req.params.studentId)
        .then(session => {
            // we only let the location and/or date to be modified.
            if (req.body.date != undefined) {
                session.VivaDate = req.body.date;
            }
            if (req.body.location != undefined) {
                session.Location = req.body.location;
            }
            // updating done, save to database in next step.
            return session
        })
        .then(updatedSession => {
            updatedSession.save(err => {
                if (err) { res.status(400).send(err); }
                else { res.status(200).send(true);}
            })
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

/** testing the method. */
router.get('/:email/send', (req, res) => {
    const mailer = require('../impl/scheduleImpl').notifyVivaScheduleViaEmail;

    if (mailer(req.params.email, '', '')) {
        res.status(200).send('Email sent');
    }
    else {
        res.status(400).send('Email not sent');
    }
})

/** add a session. */
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
