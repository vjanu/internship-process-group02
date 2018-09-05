/* * * * *     Global Variables     * * * * */
let baseUrlLocal = 'http://localhost:3000';
let baseUrlProd = 'http://ec2-18-209-163-192.compute-1.amazonaws.com:3000';

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
        emailAddresses: document.getElementById('emails-student').value,   // may contain multiple values separated by comma ( , )
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


    axios.post(baseUrlProd+'/forms/form-i-1/student/'+data.studentId, data)
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
        //internshipStart: document.getElementById('').value,
        //internshipEnd: document.getElementById('').value
    };

    axios.post(baseUrl+'/forms/form-i-1/supervisor/'+data.studentId, data)
        .then(response => {
            console.log(response.data);
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


function checkSupervisorExists() {
    console.log("Function called");
    let data = {
        SupervisorEmail: document.getElementById('email').value,
        SupervisorPassword: document.getElementById('password').value
    }

    axios.post(baseUrlLocal+'/supervisor/login',data, {headers: headers})
        .then(response => {
            console.log(response.data);
            if(response.data.success){
                let user_info = {
                    UserType:"Supervisor",
                    SupervisorId:response.data.SupervisorId,
                    SupervisorName:response.data.SupervisorName,
                    SupervisorEmail:response.data.SupervisorEmail}
                localStorage.setItem('user_info', window.btoa(JSON.stringify(user_info)));
            
                window.location.href = "supervisor_dashboard.html";
            }else{
                alert("Invalid login credencials");
            }
        })
        .catch(error => {
            alert("Invalid login credencials")
            console.log(error);
        })
}


$(document).ready(function() {
	let userInfo = localStorage.getItem('user_info') ? JSON.parse(window.atob(localStorage.getItem('user_info'))) : [];


    if($("#supervisor-dashboard-page").length > 0){
        if(!("user_info" in localStorage)){
    		window.location.href = "index.html";
    	}else{
            $(document).ready(function(){

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
        email: document.getElementById('email').value,   // may contain multiple values separated by comma ( , )
        spec: document.getElementById('spec').value,
        internshipTitle: document.getElementById('internshipTitle').value,
        from: document.getElementById('from').value,
        to: document.getElementById('to').value
    }   
    form3Data.email = form3Data.email.includes(',') ? form3Data.email.replace(' ', '').split(',') : form3Data.email;

    form3Data.studentId = form3Data.studentId.includes(' ') ? form3Data.studentId.split(' ').join('') : form3Data.studentId;

    axios.post(baseUrlLocal+'/form3/form-i-3/student/'+form3Data.studentId, form3Data, {headers: headers})
    .then(response => {
        console.log(response.form3Data);
    })
    .catch(error => {
        console.log(error);
    })

}

function getFormI3DiaryDetails() {
    let form3DiaryData = {
        studentId: document.getElementById('studentId').value,
        desc: document.getElementById('desc').value,
        party: document.getElementById('party').value,
        from: document.getElementById('from').value,
        to: document.getElementById('to').value
    }   

    form3DiaryData.studentId = form3DiaryData.studentId.includes(' ') ? form3DiaryData.studentId.split(' ').join('') : form3DiaryData.studentId;

    axios.post(baseUrlLocal+'/daily/form-i-3/diary/'+form3DiaryData.studentId, form3DiaryData, {headers: headers})
    .then(response => {
        console.log(response.form3DiaryData);
    })
    .catch(error => {
        console.log(error);
    })

}