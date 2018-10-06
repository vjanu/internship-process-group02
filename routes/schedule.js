const express = require('express');
const router = express.Router();
const scheduleImpl = require('../impl/scheduleImpl');

/* GET scheduled viva sessions. */
router.get('/all', (req, res) => {
   scheduleImpl.findAllScheduledAndUnscheduledSessions()
       .then(resolve => {
           console.log(resolve);
       })
       .catch(reject => {
           console.log(reject);
       });

   res.status(200).send();
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
