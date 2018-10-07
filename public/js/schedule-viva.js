/* * * * *     Global Variables     * * * * */

let BASE_URL_LOCAL = 'http://localhost:3000';
// let BASE_URL_PROD = 'http://ec2-18-209-163-192.compute-1.amazonaws.com:3000';
let USER_INFO = 'user-info';
let CURRENT_URL = window.location.href;

// change this to baseUrl = baseUrlLocal if you are developing.
let baseUrl = BASE_URL_LOCAL;

/* * * * *     Headers for cross origin issues   * * * * */
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

/**
 * Shows the currently scheduled viva sessions.
 */
function renderScheduleTable() {
    // get the schedules first.
    axios.get(baseUrl + '/schedule')
        .then(response => {
            if (response.status == 200) {
                // define table structure.
                let html =
                    '<table class="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Student Id</th>' +
                    '<th>Emails</th>' +
                    '<th>Viva Session Time/Data</th>' +
                    '<th>Location</th>' +
                    '<th>Operations</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';  // be sure to close the tags.
                
                // add data.
                response.data.forEach(session => {
                    let date = session.VivaDate.split('T')[0];
                    let time = session.VivaDate.split('T')[1].split(':');  // HH:mm:ss.z => should be converted to HH:mm
                    time = time[0] + ':' + time[1];
            
                    html +=
                    '<tr>' +
                    '<td>' + session.StudentId + '</td>' +
                    '<td>' + session.StudentEmails + '</td>' +
                    '<td>' +
                    '<input id="session-date-' + session.StudentId + '" type="date" value="' + date + '"/>'+
                    '<input id="session-time-' + session.StudentId + '" type="time" value="' + time + '"/>'+
                    '</td>' +
                    '<td><input id="session-location-' + session.StudentId + '" type="text" class="form-control" value="' + session.Location + '"/></td>' +
                    '<td><button id="update-session-' + session.StudentId + '" class="btn btn-primary" onclick=updateSession(this);>Update</button></td>' +
                    '</tr>';
                });

                // closing tags.
                html += '</tbody></table>';

                // apeend to html.
                $('#scheduled-table').append(html);
            }
        })
        .catch(err => { console.log(err); });
}

/**
 * Shows the currently scheduled viva sessions.
 */
function renderPendingTable() {
    // get the schedules first.
    axios.get(baseUrl + '/schedule/both')
        .then(response => {
            if (response.status == 200) {
                // define table structure.
                let html =
                    '<table class="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Student Id</th>' +
                    '<th>Viva Session Time/Data</th>' +
                    '<th>Location</th>' +
                    '<th>Operations</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';  // be sure to close the tags.
                
                // add data.
                response.data.all.forEach(session => {
                    html +=
                    '<tr>' +
                    '<td>' + session.StudentId + '</td>' +
                    '<td>' +
                    '<input id="session-date-' + session.StudentId + '" type="date"/>'+
                    '<input id="session-time-' + session.StudentId + '" type="time"/>'+
                    '</td>' +
                    '<td><input id="session-location-' + session.StudentId + '" type="text" class="form-control"/></td>' +
                    '<td><button id="schedule-session-' + session.StudentId + '" class="btn btn-primary" onclick=addSession(this);>Schedule</button></td>' +
                    '</tr>';
                });

                // closing tags.
                html += '</tbody></table>';

                // apeend to html.
                $('#pending-table').append(html);
            }
        })
        .catch(err => { console.log(err); });
}

function updateSession(button) {
    // student's id is embedded in the button's id to easily recognize to whom the entyr belongs.
    let studentId = button.id.replace('update-session-', '');
    
    // get the new data for location and/or date time.
    let location = $('#session-location-'+studentId).val();
    let date = $('#session-date-'+studentId).val().split('-');  // [2018, 09, 23]
    let time = $('#session-time-'+studentId).val(); // [04, 11, 00.00Z]
    // we need to put date and time into one string since db only has one attribute for date/time.
    let vivaDate = date[1] + '/' + date[2] + '/' + date[0] + ' ' + time; // ex:- 09/23/2018 04:11

    // PUT request to the backend.
    let data = { 
        studentId: studentId, 
        date: vivaDate, 
        location: location 
    };
    console.log('\t', data);
    axios.put(baseUrl + '/schedule/' + studentId, data)
    .then(response => {
        if (response.status == 200) {
            // refresh the page to reflect the changes made.
            window.location.reload();
        }
        else {
            alert('Update failed for Student ' + studentId);
        }
    })
}

function addSession(button) {
    // student's id is embedded in the button's id to easily recognize to whom the entyr belongs.
    let studentId = button.id.replace('schedule-session-', '');
    
    // get the new data for location and/or date time.
    let location = $('#session-location-'+studentId).val();
    let date = $('#session-date-'+studentId).val().split('-');  // [2018, 09, 23]
    let time = $('#session-time-'+studentId).val(); // [04, 11, 00.00Z]
    // we need to put date and time into one string since db only has one attribute for date/time.
    let vivaDate = date[1] + '/' + date[2] + '/' + date[0] + ' ' + time; // ex:- 09/23/2018 04:11

    // PUT request to the backend.
    let data = { 
        studentId: studentId, 
        date: vivaDate, 
        location: location 
    };
    console.log('\t', data);
    axios.post(baseUrl + '/schedule', data)
    .then(response => {
        if (response.status == 200) {
            // refresh the page to reflect the changes made.
            window.location.reload();
        }
        else {
            alert('Update failed for Student ' + studentId);
        }
    })
}