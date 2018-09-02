const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/form-i-1', function(req, res) {
    // checking if all parameters are present since all of them are needed,
    // to complete the form I-1 from student's perspective.
    let allParamsPresent = true;
    let paramKeys = Object.keys(req.body);

    for (let i = 0; i < paramKeys.length; i++) {
        let key = paramKeys[i];
        let param = req.body[key];

        if (param == '' || param == undefined) { allParamsPresent = false; break; }
    }

    res.send({ success: allParamsPresent });
});

module.exports = router;
