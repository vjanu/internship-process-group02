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


/* * * * *     Event Triggers     * * * * */

$('#btn-logout').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem(USER_INFO);
    window.location.href = "index.html";
});




if (CURRENT_URL.includes('supervisor-student-list')) {
    loadSupervisorStudentList();
}


function loadSupervisorStudentList() {
    if (!(USER_INFO in localStorage)) {
        window.location.href = "index.html";
    } else {
        let userInfo = localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO)) : [];

        axios.get(baseUrl + '/supervisor/form-i-1/' + userInfo.userData.SupervisorEmail)
            .then(function (response) {
                // handle success
                // console.log(response.data);

                $("#form-i-1-submitted-students tbody").empty();

                response.data.data.forEach(item => {
                    if (item.hasOwnProperty('EmployerName')) {
                        var btnClassName = "btn btn-success btn-sm"
                        var iconClassName = "fas fa-check"
                        var altText = "Supervisor details submitted"


                    } else {
                        var btnClassName = "btn btn-danger btn-sm"
                        var iconClassName = "fas fa-times"
                        var altText = "Supervisor details not submitted"
                    }

                    $('#form-i-1-submitted-students tbody').append('<tr>' +

                        '<td><center><a class="' + btnClassName + '" title="' + altText + '"><span class="' + iconClassName + '" style="color: #ffffff" aria-hidden="true"></span></center></td>' +

                        '<td class="nr-fid" scope="row">' + item.StudentId + '</td>' +
                        '<td >' + item.StudentName + '</td>' +
                        '<td >' + item.StudentAddress + '</td>' +
                        '<td>' + item.StudentMobilePhone + '</td>' +
                        '<td><center>' +
                        '<a href="supervisor-submission-form.html#' + item.StudentId + '" title="View ' + item.StudentId + '\'s Form I-1" class="btn btn-primary btn-sm">\n' +
                        '        <span class="far fa-eye" aria-hidden="true"></span>\n' +
                        '        <span><strong>View</strong></span></a>' +
                        '</a></center>' +
                        '</td>' +
                        '</tr>');
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
}