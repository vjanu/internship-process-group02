/* * * * *     Global Variables     * * * * */

let BASE_URL_LOCAL = 'http://localhost:3000';
let BASE_URL_PROD = 'http://ec2-18-209-163-192.compute-1.amazonaws.com:3000';


// change this to baseUrl = baseUrlLocal if you are developing.
let baseUrl = BASE_URL_LOCAL;

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

$('#btn-form-refresh').on('click', function () {
    populateFormI3();
});

$('#btn-register').on('click', function () {
    getRegisterDetails();
});

$('#btn-login-supervisor').on('click', function () {
    validateUserSignedIn();
});

$('#btn-logout').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('user_info');
    window.location.href = "index.html";
});





/* * * * * * * Forms * * * * * * */

/**** Liyanage A.Y.K. *****/
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
        cgpa: document.getElementById('cgpa-student').value,
        assignedSupervisor: document.getElementById('assigned-supervisor').value
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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

/***
 * This function validate user
 */
function validateUserSignedIn() {
    let data = {
        userEmail: document.getElementById('email').value,
        userPassword: document.getElementById('password').value
    }

    axios.post(baseUrl + '/login', data)
        .then(response => {
            console.log(response.data);
            if (response.data.success) {
                let user_info = {
                    UserType: response.data.userType,
                    userData: response.data.info[0]
                }
                localStorage.setItem('user_info', window.btoa(JSON.stringify(user_info)));
                // localStorage.setItem('user_info', (JSON.stringify(user_info)));
                if(user_info.UserType == 'Student'){
                    window.location.href = "Student_dashboard.html";
                }else if(user_info.UserType == 'Supervisor'){
                    window.location.href = "supervisor_dashboard.html";
                }else if(user_info.UserType == 'InternshipManager'){
                    window.location.href = "internship-manager.html";
                }else{
                    alert("Invalid login credentials")
                }
            } else {
                alert("Invalid login credentials");
            }
        })
        .catch(error => {
            alert("Invalid login credentials")
            console.log(error);
        })
}



/* * * * * * * Dashboards * * * * * * */

function getAllInternships() {
    let headerMap = new Map();

    // setting headers and their corresponding json keys.
    headerMap.set('Student ID', 'StudentId');
    headerMap.set('Student Name', 'StudentName');
    headerMap.set('Internship Start', 'InternshipStart');
    headerMap.set('Internship End', 'InternshipEnd');
    headerMap.set('Forms', '-');

    axios.get(baseUrl + '/forms/form-i-1')
    .then(response => {
        if (response.data.success) {
            console.log(response.data.data);
            let table = renderInternshipsTable(response.data.data);
            $('#internships-table').append(table);
        }
    })
}

/*
 * this will render the internships manager's dashboard.
 * 
 * @param columnMap:
 *      a map where the key is the column name and the value is the key of the json data,
 *      that is relevant to the column.
 *      
 */
function renderInternshipsTable(jsonData) {

    let table = '<table class="table">' +
                    '<thead>' +
                        '<tr>' +
                            '<th> Student ID </th>' +  
                            '<th> Student Name </th>' +  
                            '<th> Internship Start </th>' +  
                            '<th> Internship End </th>' +  
                            '<th> Forms </th>' +
                        '<tr>' +
                    '<thead>' +
                    '<tbody>';
    
    // iterate through each student's form i-1.
    jsonData.forEach(form => {
        table += '<tr>' +
                    '<td>' + form.StudentId + '</td>' +
                    '<td>' + form.StudentName + '</td>' +
                    '<td>' + (form.InternshipStart == undefined ? '<span class="badge badge-danger">Pending Form I-1 | Supervisor</span>' : form.InternshipStart.split('T')[0]) + '</td>' +
                    '<td>' + (form.InternshipEnd == undefined ? '<span class="badge badge-danger">Pending Form I-1 | Supervisor</span>' : form.InternshipEnd.split('T')[0]) + '</td>' +
                    // the reason dates are split by 'T' is that the full date we get looks like 2018-09-10T00:00:00 but we only need the date and not the time.
                    '<td>' +
                        '<a href="form-i-1.html#' + form.StudentId + '">Form I-1</a> <br>' +
                        '<a href="form-3.html#' + form.StudentId + '">Form I-3</a> <br>' +
                        '<a href="form-5.html#' + form.StudentId + '">Form I-5</a> <br>' +
                    '</td>' +
                '<tr>';
    });
    table += '</tbody></table>';

    return table;
}
$(document).ready(function () {
    let userInfo = localStorage.getItem('user_info') ? JSON.parse(window.atob(localStorage.getItem('user_info'))) : [];
    console.log(userInfo);

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
                axios.get(baseUrl + '/supervisor/form-i-1/'+userInfo.userData.SupervisorEmail)
                    .then(function (response) {
                        // handle success
                        // console.log(response.data);

                        $("#form-i-1-submitted-students tbody").empty();

                        response.data.data.forEach(item => {
                            if(item.hasOwnProperty('EmployerName')){
                                var btnClassName = "btn btn-success btn-sm"
                                var iconClassName = "fas fa-check"
                                var altText = "Supervisor details submitted"


                            }else{
                                var btnClassName = "btn btn-danger btn-sm"
                                var iconClassName = "fas fa-times"
                                var altText = "Supervisor details not submitted"
                            }

                            $('#form-i-1-submitted-students tbody').append('<tr>' +

                            '<td><center><a class="'+btnClassName+'" title="'+altText+'"><span class="'+iconClassName+'" style="color: #ffffff" aria-hidden="true"></span></center></td>' +

                            '<td class="nr-fid" scope="row">' + item.StudentId + '</td>' +
                            '<td >' + item.StudentName + '</td>' +
                            '<td >' + item.StudentAddress + '</td>' +
                            '<td>' + item.StudentMobilePhone + '</td>' +
                            '<td><center>' +
                            '<a href="supervisor-submission-form.html#' + item.StudentId + '" title="View '+item.StudentId+'\'s Form I-1" class="btn btn-primary btn-sm">\n' +
                            '        <span class="far fa-eye" aria-hidden="true"></span>\n' +
                            '        <span><strong>View</strong></span></a>'+
                            '</a></center>' +
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

    axios.post(baseUrl + '/form3/form-i-3/student/' + form3Data.studentId, form3Data, {
        headers: headers
    })
        .then(response => {
            console.log(response.form3Data);
            alert("Successfully Added Your Data!");           
            document.getElementById('name').value = "";
            document.getElementById('studentId').value = "";
            document.getElementById('address').value = "";
            document.getElementById('contactNumber').value = "";
            document.getElementById('email').value = "";
            document.getElementById('spec').value = "";
            document.getElementById('internshipTitle').value = "";
            document.getElementById('from').value = "";
            document.getElementById('to').value = "";
        })
        .catch(error => {
            console.log(error);
            alert("One or More fields are empty!");            
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

    axios.post(baseUrl + '/daily/form-i-3/diary/', form3DiaryData, {
        headers: headers
    })
        .then(response => {
            console.log(response.form3DiaryData);
            alert("Successfully Added Your Data!");
            document.getElementById('studentIdDiary').value = "";
            document.getElementById('desc').value = "";
            document.getElementById('party').value = "";
            document.getElementById('fromDiary').value = "";
            document.getElementById('toDiary').value = "";
        })
        .catch(error => {
            console.log(error);
            alert("One or More fields are empty!");
            
        })

}

function getUpload() {
    alert('Successfully Uploaded');
}


function populateFormI3() {
    let userInfo = localStorage.getItem('user_info') ? JSON.parse(window.atob(localStorage.getItem('user_info'))) : [];
    let studentIdDiary = userInfo.userData.RegistrationNo;
    axios.get(baseUrl+'/daily/data/'+studentIdDiary)
    .then(response => {
        if (response.data.success) {
            let form_details = response.data.data;
            console.log(form_details);
            console.log(form_details.length);
            $(document).ready(function () {
                
                var html = "<table  align='center' style='width:1068px' border='1|1' class='table-bordered table-hover'>";
                html+="<head>";
                html+="<tr>";
                html+="<td width='25%'align='center'> "+'<b>'+'Training Party'+'</b>'+" </td>";
                html+="<td width='46%' style='max-width: 20px;' align='center'> "+'<b>'+'Training Description'+'</b>'+" </td>";
                html+="<td width='15%' align='center'> "+'<b>'+ 'From'+'</b>'+" </td>";
                html+="<td width='25%' align='center'> "+'<b>'+'To'+'</b>'+" </td>";
                html+="</tr>";
                html+="</head>";
                for (var i = 0; i < form_details.length; i++) {
                    html+="<tr>";
                    html+="<td width='20%'align='center'> "+form_details[i].TrainingParty+" </td>";
                    html+="<td width='40%' style='max-width: 20px;' align='center'> "+form_details[i].TrainingDescription+" </td>";
                    html+="<td width='15%' align='center'> "+form_details[i].From+" </td>";
                    html+="<td width='15%' align='center'> "+form_details[i].To+" </td>";
            
                    html+="</tr>";
            
                }
                html+="</table>";
                $("#form-i-3-daily-diary-desc").html(html);
            })
            console.log("hel");
        }
    })

    
    .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(JSON.stringify(error));
          console.log(error.response.headers);
        }
    });
}




function getRegisterDetails() {
    let registerData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        nic: document.getElementById('nic').value,
        regno: document.getElementById('regno').value,
        dept: document.getElementById('dept').value,
        year: document.getElementById('year').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
        
    }   



    axios.post(baseUrl + '/register/info/student/' + registerData.nic, registerData, {
            headers: headers
        })
    .then(response => {
        console.log(response);
        if(response.data.success){
            alert("Successfully Registered!");
            document.getElementById('firstName').value = "";
            document.getElementById('lastName').value = "";
            document.getElementById('nic').value = "";
            document.getElementById('regno').value = "";
            document.getElementById('dept').value = "";
            document.getElementById('year').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
        }else{
            alert("User Not Registered!")
        }
    })
    .catch(error => {
        console.log(error);
    })
}


/**** Tharushi  ****/
/*
 * Send request to backend in order to get all form i-1 s under a given supervisor.
 */
function getFormI1sUnderSupervisor(supervisorEmail) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + '/forms/form-i-1/supervisor/' + supervisorEmail)
            .then(response => {
                if (response.data.success) {
                    if (response.data.data != undefined) {
                        resolve(response.data.data);
                    }
                }
            })
            .catch(error => {
                reject(error);
            })
    })
}


function makeSupervisorDashboard() {
    let userInfo = localStorage.getItem('user_info') ? JSON.parse(window.atob(localStorage.getItem('user_info'))) : [];
    console.log(userInfo.userData.SupervisorEmail)
    getFormI1sUnderSupervisor(userInfo.userData.SupervisorEmail)
        .then(resolve => {
            // we render the table here.
            let table = '<table class="table table-striped table-bordered" style="width:100%">' +
                '<thead>' +
                '<tr>' +
                '<th scope="col">Student Id number</th>' +
                '<th scope="col">Name</th>' +
                '<th scope="col">Job title</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            resolve.forEach(form => {
                table +=
                    '<tr>' +
                    '<td>' +
                    '<a href="Supervisor_viewStudentProfile.html#' + form.StudentId + '" data-toggle="tooltip" data-placement="right" title="Click to view the interns profile">' +
                    form.StudentId +
                    '</a>' +
                    '</td>' +
                    '<td>' + form.StudentName + '</td>' +
                    '<td>' + 'Intern' + '</td>' +
                    '</tr>'
            });

            table += '</tbody> </table>';

            document.getElementById('SupervisorTableContainer').innerHTML = table;
        })
        .catch(reject => {
            console.log(reject);
        });
}

function populateStudentProfile() {
    // student id is in the url.
    let currentUrl = window.location.href;
    let studentId = currentUrl.substr(currentUrl.indexOf('#') + 1, currentUrl.length);

    axios.get('/forms/form-i-1/student/' + studentId)
        .then(response => {
            if (response.data.success) {
                let form = response.data.data;
                console.log(form);
                document.getElementById('student-id').value = form.StudentId;
                document.getElementById('student-name').value = form.StudentName;
                document.getElementById('job-title').value = 'Intern';
                document.getElementById('start').value = form.InternshipStart.split('T')[0];
                document.getElementById('end').value = form.InternshipEnd.split('T')[0];
            }
        })
        .catch(error => {
            console.log(error);
        });

    // check if form i-1, form i-3 and form i-5 are present or not.
    // if present, hyperlink it!
    // form i 1.
    isFormAvailable(studentId, 'form-i-1')
    .then(resolve => {
        document.getElementById('status-of-form-i-1').innerHTML =  'Done';
    });
    document.getElementById('link-to-form-i-1').href = 'supervisor-submission-form.html#' + studentId;

}

// had to make this a promise since this involves an API call.
function isFormAvailable(studentId, formName) {
    // send a request to backend and see if any data returns.

    return new Promise((resolve, reject) => {
        if (formName.toLowerCase() === 'form-i-1') {
            axios.get(baseUrl + '/forms/form-i-1/student/' + studentId)
                .then(response => {
                    if (response.data.success) {
                        let supervisorEmail = response.data.data.SupervisorEmail;
                        if (supervisorEmail != '') {
                            console.log(supervisorEmail);
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }
                })
        }
        else if (formName.toLowerCase() === 'form-i-3') {


        }
        else if (formName.toLowerCase() === 'form-i-5') {

        }
    })
}
