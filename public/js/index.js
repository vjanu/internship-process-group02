/* * * * *     Global Variables     * * * * */
let baseUrlLocal = 'http://localhost:3000';
// let baseUrlProd = 'http://ec2-18-209-163-192.compute-1.amazonaws.com:3000';

// change this to baseUrl = baseUrlLocal if you are developing.
let baseUrl = baseUrlLocal;

/* * * * *     Headers for cross origin issues   * * * * */
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

/* * * * *     Event Triggers     * * * * */
// form submit for form I-1, student perspective.
$('#btn-form-i-1-student').on('click', function () {
    getFormI1StudentDetails();
});
// form submit for form I-1, supervisor perspective.
$('#btn-form-i-1-supervisor').on('click', function () {
    getFormI1SupervisorDetails();
});

$('#btn-form-i-3-student').on('click', function () {
    getFormI3StudentDetails();
});

$('#btn-form-submit').on('click', function () {
    getFormI3DiaryDetails();
});

/*
 * this will get the information filled by the student,
 * on Form I-1 and validate and prepare in order to be sent,
 * to the backend.
 */
function getFormI1StudentDetails() {
    let data = {
        name: document.getElementById('name-student').value,
        studentId: document.getElementById('id-student').value,
        address: document.getElementById('address-student').value,
        homePhone: document.getElementById('home-phone-student').value,
        mobilePhone: document.getElementById('mobile-phone-student').value,
        emailAddresses: document.getElementById('emails-student').value, // may contain multiple values separated by comma ( , )
        year: document.getElementById('year-student').value,
        semester: document.getElementById('semester-student').value,
        cgpa: document.getElementById('cgpa-student').value
    }


    /* formatting input parameters. */
    // getting the multiple emails in an array.
    data.emailAddresses = data.emailAddresses.includes(',') ? data.emailAddresses.replace(' ', '').split(',') : data.emailAddresses;

    // replacing spaces of IT number since some students may type IT 16 1111 11 instead of IT16111111
    // splitting by spaces and joining without a space will replace all the spaces since .replace() function only replace one occurrence
    data.studentId = data.studentId.includes(' ') ? data.studentId.split(' ').join('') : data.studentId;


    axios.post(baseUrl + '/forms/form-i-1/student/' + data.studentId, data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}


/*
 * this will get the information filled by the supervisor,
 * on Form I-1 and validate and prepare in order to be sent,
 * to the backend.
 */
function getFormI1SupervisorDetails() {
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


/**** Tharindu TCJ *****/

// 
$('#btn-login-supervisor').on('click', function () {
    checkSupervisorExists();
});

//
$('#btn-logout').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('login_info');
    window.location.href = "index.html";
});

// check if the loaded page is a form-i-1 page with a student id embeded in the url.
// valid url: domain.com/form-i-1.html#<StudentId>
let current_url = window.location.href;
if (current_url.includes('#') && current_url.includes('supervisor-submission-form')) {
    studentId = current_url.substr(current_url.indexOf('#') + 1, current_url.length);
    populateFormI1(studentId);
}


function populateFormI1(studentId) {
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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function checkSupervisorExists() {
    console.log("Function called");
    let data = {
        SupervisorEmail: document.getElementById('email').value,
        SupervisorPassword: document.getElementById('password').value
    }

    axios.post(baseUrl + '/supervisor/login', data)
        .then(response => {
            console.log(response.data);
            if (response.data.success) {
                let user_info = {
                    UserType: "Supervisor",
                    SupervisorId: response.data.SupervisorId,
                    SupervisorName: response.data.SupervisorName,
                    SupervisorEmail: response.data.SupervisorEmail
                }
                localStorage.setItem('user_info', window.btoa(JSON.stringify(user_info)));

                window.location.href = "supervisor_dashboard.html";
            } else {
                alert("Invalid login credencials");
            }
        })
        .catch(error => {
            alert("Invalid login credencials")
            console.log(error);
        })
}


$(document).ready(function () {
    let userInfo = localStorage.getItem('user_info') ? JSON.parse(window.atob(localStorage.getItem('user_info'))) : [];
    console.log("document  >>> On Ready");

    if ($("#supervisor-dashboard-page").length > 0) {
        if (!("user_info" in localStorage)) {
            window.location.href = "index.html";
        } else {
            $(document).ready(function () {

            });
        }
    } else if ($("#supervisor-student-list-page").length > 0) {
        if (!("user_info" in localStorage)) {
            window.location.href = "index.html";
        } else {
            $(document).ready(function () {
                axios.get(baseUrl + '/forms/form-i-1')
                    .then(function (response) {
                        // handle success
                        // console.log(response.data);

                        $("#form-i-1-submitted-students tbody").empty();

                        response.data.data.forEach(item => {
                            console.log(item.StudentId);

                            $('#form-i-1-submitted-students tbody').append('<tr>' +
                                '<td class="nr-fid" scope="row">' + item.StudentId + '</td>' +
                                '<td >' + item.StudentName + '</td>' +
                                '<td >' + item.StudentAddress + '</td>' +
                                '<td>' + item.StudentMobilePhone + '</td>' +
                                '<td>' +
                                '<a class="btn btn-success" type="button" href="supervisor-submission-form.html#' + item.StudentId + '">' +
                                '<span class=" glyphicon glyphicon-plus"></span>' +
                                '</a>' +
                                '</td>' +
                                '</tr>');
                        });



                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
            });
        }
    }
});

/**** Vira *****/

function getFormI3StudentDetails() {
    let form3Data = {
        name: document.getElementById('name').value,
        studentId: document.getElementById('studentId').value,
        address: document.getElementById('address').value,
        contactNumber: document.getElementById('contactNumber').value,
        email: document.getElementById('email').value, // may contain multiple values separated by comma ( , )
        spec: document.getElementById('spec').value,
        internshipTitle: document.getElementById('internshipTitle').value,
        from: document.getElementById('from').value,
        to: document.getElementById('to').value
    }
    form3Data.email = form3Data.email.includes(',') ? form3Data.email.replace(' ', '').split(',') : form3Data.email;

    form3Data.studentId = form3Data.studentId.includes(' ') ? form3Data.studentId.split(' ').join('') : form3Data.studentId;

    axios.post(baseUrl + '/form3/form-i-3/student/' + form3Data.studentId, form3Data)
        .then(response => {
            console.log(response.form3Data);
        })
        .catch(error => {
            console.log(error);
        })

}

function getFormI3DiaryDetails() {
    let form3DiaryData = {
        studentIdDiary: document.getElementById('studentIdDiary').value,
        desc: document.getElementById('desc').value,
        party: document.getElementById('party').value,
        fromDiary: document.getElementById('fromDiary').value,
        toDiary: document.getElementById('toDiary').value
    }

    form3DiaryData.studentIdDiary = form3DiaryData.studentIdDiary.includes(' ') ? form3DiaryData.studentIdDiary.split(' ').join('') : form3DiaryData.studentIdDiary;

    axios.post(baseUrl + '/daily/form-i-3/diary/', form3DiaryData)
        .then(response => {
            console.log(response.form3DiaryData);
        })
        .catch(error => {
            console.log(error);
        })

}