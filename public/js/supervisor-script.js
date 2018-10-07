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

$('#btn-form-i-1-supervisor').on('click', function () {
    getFormI1SupervisorDetails();
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
                    var html = '<tr>';
                    html += '<td class="text-center">' + item.StudentId + '</td>';
                    html += '<td class="text-center">' + item.StudentName + '</td>';
                    html += '<td class="text-center">' + item.StudentAddress + '</td>';
                    html += '<td class="text-center">' + item.StudentMobilePhone + '</td>';
                    html += '<td class="text-center">' + generateFormI1UpdatedStatus(item.hasOwnProperty('EmployerName')) + '</td>';
                    html += '<td class="text-center">';
                    html += '<a href="supervisor-submission-form.html#' + item.StudentId + '" title="View ' + item.StudentId + '\'s Form I-1" class="btn btn-primary btn-sm">\n';
                    html += '        <span class="far fa-eye" aria-hidden="true"></span>\n';
                    html += '        <span><strong>View</strong></span></a>';
                    html += '</td>';
                    html += '</tr>';

                    $('#form-i-1-submitted-students tbody').append(html);
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
}



function populateFormI1() {
    // get student id from the url.
let current_url = window.location.href;
    console.log(current_url);
    if (current_url.includes('#')) {
        let studentId = current_url.substr(current_url.indexOf('#') + 1, current_url.length);

    console.log('Fetching student details of ' + studentId + ' for form I-1');

    axios.get(baseUrl + '/forms/form-i-1/student/' + studentId)
        .then(response => {
            if (response.data.success) {
                let form_details = response.data.data;
                console.log(form_details);

                document.getElementById('name-student').value = form_details['StudentName'];
                document.getElementById('id-student').value = form_details['StudentId'];
                document.getElementById('address-student').value = form_details['StudentAddress'];
                document.getElementById('home-phone-student').value = form_details['StudentHomePhone'];
                document.getElementById('mobile-phone-student').value = form_details['StudentMobilePhone'];
                document.getElementById('cgpa-student').value = form_details['CGPA'];
                document.getElementById('emails-student').value = form_details['StudentEmails'].join(', ').replace('[').replace(']');
                document.getElementById('year-student').value = form_details['Year'];
                document.getElementById('semester-student').value = form_details['Semester'];

                $("#header-studentId").text(form_details['StudentId']);

                // iterate through each input element and feed the above data, but keep the text boxes disabled.let elems = $('#form-i-1-student').find(':input');
                let elems = $('#form-i-1-student').find(':input');
                for (let i = 0; i < elems.length; i++) {
                    elems[i].innerHTML
                    elems[i].disabled = true;
                }

                if(form_details.hasOwnProperty('EmployerName')){
                    $('#name-employer').val(form_details['EmployerName']);
                    $('#address-employer').val(form_details['EmployerAddress']);
                    $('#name-supervisor').val(form_details['SupervisorName']);
                    $('#title-supervisor').val(form_details['SupervisorTitle']);
                    $('#phone-supervisor').val(form_details['SupervisorPhone']);
                    $('#email-supervisor').val(form_details['SupervisorEmail']);
                    $('#internship-start-date').val(formatDate(form_details['InternshipStart']));
                    $('#internship-end-date').val(formatDate(form_details['InternshipEnd']));
                    $('#no-of-hours').val(form_details['WorkHoursPerWeek']);
                }

            }
        })
        .catch(reject => {
            console.log(reject);
        })
    }
}


/*
 * this will get the information filled by the supervisor,
 * on Form I-1 and validate and prepare in order to be sent,
 * to the backend.
 */
function getFormI1SupervisorDetails() {
    if(!validateEmail(document.getElementById('email-supervisor').value)){
        alert('Invalid EMail');
        return;
    }

    if(!validateIsEmpty(document.getElementById('name-employer').value)){
        alert('Invalid Employer Name');
        return;
    }

    if(!validateIsEmpty(document.getElementById('name-supervisor').value)){
        alert('Invalid Supervisor Name');
        return;
    }

    if(!validateIsEmpty(document.getElementById('title-supervisor').value)){
        alert('Enter supervisor title');
        return;
    }

    if(!validateIsEmpty(document.getElementById('phone-supervisor').value)){
        alert('Phone number cannot be empty');
        return;
    }

    if(!validateIsEmpty(document.getElementById('internship-start-date').value)){
        alert('Invalid Internship Start Date');
        return;
    }

    if(!validateIsEmpty(document.getElementById('internship-end-date').value)){
        alert('Invalid Internship End Date');
        return;
    }

    if(!validateIsEmpty(document.getElementById('no-of-hours').value)){
        alert('Invalid Number of hours');
        return;
    }


    let data = {
        studentId: document.getElementById('id-student').value, // because supervisor data is stored within the student's record.
        employerName: document.getElementById('name-employer').value,
        employerAddress: document.getElementById('address-employer').value,
        supervisorName: document.getElementById('name-supervisor').value,
        supervisorTitle: document.getElementById('title-supervisor').value,
        supervisorPhone: document.getElementById('phone-supervisor').value,
        supervisorEmail: document.getElementById('email-supervisor').value,
        internshipStart: document.getElementById('internship-start-date').value,
        internshipEnd: document.getElementById('internship-end-date').value,
        workHoursPerWeek: document.getElementById('no-of-hours').value
    };

    axios.post(baseUrl + '/forms/form-i-1/supervisor/' + data.studentId, data)
        .then(response => {
            console.log(response.data);
            alert(response.data.message)
        })
        .catch(error => {
            console.log(error);
        })
}


/* * * * *     COMMON FUNCTION     * * * * */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function generateFormI1UpdatedStatus(isSubmitted) {
    var badgeClass = (isSubmitted) ? "badge badge-pill badge-success" : "badge badge-pill badge-danger";
    var badgeText = (isSubmitted) ? "Submitted" : "Pending";

    return '<h5><span class="' + badgeClass + '"><span style="color:white">' + badgeText + '</span></span></h5>';
}

/*** VALIDATIONS ***/

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateIsEmpty(str){
    return /\S+/.test(str);
}