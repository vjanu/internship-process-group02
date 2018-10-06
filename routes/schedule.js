const express = require('express');
const router = express.Router();
const schedule = require('../models/scheduleModel');

/* GET scheduled viva sessions. */
router.get('/', (req, res) => {
   schedule.find((err, data) => {

   })
});


module.exports = router;
