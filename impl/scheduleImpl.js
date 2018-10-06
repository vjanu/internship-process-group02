/**
 * @author Liyanage A.Y.K.
 *
 * This is the backend implementation that will server the functionality around
 * scheduling viva sessions.
 */

const schedule = require('../models/scheduleModel').scheduleModel;
const formI3 = require('../models/formsModel').formI3Model;
const nodemailer = require('nodemailer');

/**
 * This method will find all the records for scheduled viva sessions from the database.
 *
 * @returns {Promise<any>}
 */
let findAllScheduledVivaSessions = () => {
    // resolve if we get data, reject if not.
    return new Promise((resolve, reject) => {
        schedule.find({}, (err, data) => {
            if (data) { resolve(data); }
            else if (err) { reject(err); } 
            else { reject('Unknown error.'); }
        });

    });
}

/**
 * This will deal with all the students who have submitted all the forms and
 * 1) viva session is scheduled.
 * 2) viva session is not scheduled.
 *
 * Therefore, we group the above set of students as scheduled and unscheduled,
 * so we can display both aspects in the frontend in one API call.
 *
 * @returns {Promise<any>}
 */
let findAllScheduledAndUnscheduledSessions = () => {
    return new Promise((resolve, reject) => {
        let groupedData = {
            scheduled: [],
            pending: []
        };

        // our approach to this is go through all the students who are,
        // eligible for a viva session and filter out those who have already been,
        // assigned to a viva session.
        getAllFormI3Submissions()
        .then(data => {
            // we iterate over each form to see if the student associated with that form,
            // has a scheduled viva session in the database.
            console.log(data);
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })
    });
}

/**
 * This will return all the entries in the database for the form-i-3
 */
let getAllFormI3Submissions = () => {
    return new Promise((resolve, reject) => {
        formI3.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

/**
 * This will return the schedule of a specific student if available in the db.
 * 
 * @param {String} studentId 
 */
let getScheduleOfSpecificStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        schedule.find({ StudentId: studentId }, (err, data) => {
            if (err) {
                reject(err);
            }
            else if (data) {
                console.log(data);
                resolve(data);
            }
            else {
                reject('No data');
            }
        })
    })
}

let sessionScheduledForStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        schedule.find({ StudentId: studentId }, (err, data) => {
            if (err) {
                reject(err);
            }
            else if (data) {
                resolve(data);
            }
            else {
                reject(false);
            }
        })
    })
}


/**
 *@Author Tharushi De Silva
 */
let notifyVivaScheduleViaEmail = (recepient,vivaDate, venue) => {
    console.log(recepient);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'spm.g02.internship@gmail.com',
          pass: 'Asdf123$'
        }
      });
      
    let mailOptions = {
        from: 'spm.g02.internship@gmail.com',
        to: recepient,
        subject: 'Internship process evaluation - viva',
        text: 'Dear Student'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          return true;
        }
      });
    
}

module.exports = { findAllScheduledVivaSessions, findAllScheduledAndUnscheduledSessions, notifyVivaScheduleViaEmail, getAllFormI3Submissions, getScheduleOfSpecificStudent, sessionScheduledForStudent };

