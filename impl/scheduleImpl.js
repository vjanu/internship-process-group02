/**
 * @author Liyanage A.Y.K.
 *
 * This is the backend implementation that will server the functionality around
 * scheduling viva sessions.
 */

const schedule = require('../models/scheduleModel');

/**
 * This method will find all the records for scheduled viva sessions from the database.
 *
 * @returns {Promise<any>}
 */
let findAllScheduledVivaSessions = () => {
    // resolve if we get data, reject if not.
    return new Promise((resolve, reject) => {
        schedule.find((err, data) => {
            if (data) { resolve(data); }
            else { reject(err); }
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
        // our approach to this is go through all the students who are,
        // eligible for a viva session and filter out those who have already been,
        // assigned to a viva session.

    });
}