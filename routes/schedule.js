const express = require('express');
const router = express.Router();
const schedule = require('../models/scheduleModel');

/* GET scheduled viva sessions. */
router.get('/', (req, res) => {
   schedule.find((err, data) => {

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

module.exports = router;
