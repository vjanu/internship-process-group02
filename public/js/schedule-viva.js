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
                    html +=
                    '<tr>' +
                    '<td>' + session.StudentId + '</td>' +
                    '<td>' + session.StudentEmails + '</td>' +
                    '<td>' + session.VivaDate + '</td>' +
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

function updateSession(button) {
    // student's id is embedded in the button's id to easily recognize to whom the entyr belongs.
    let studentId = button.id.replace('update-session-', '');
    
    // get the new data for location and/or date time.
    let location = $('#session-location-'+studentId).val();
    console.log(location);
}