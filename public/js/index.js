/* * * * *     Global Variables     * * * * */
let baseUrlLocal = 'http://localhost:3000';
let baseUrlProd = 'http://ec2-18-209-163-192.compute-1.amazonaws.com:3000';

/* * * * *     Event Triggers     * * * * */
// form submit for form I-1, student perspective.
$('#btn-form-i-1-student').on('click', function () {
    getFormI1StudentDetails();
});
// form submit for form I-1, supervisor perspective.
$('#btn-form-i-1-supervisor').on('click', function () {
    getFormI1SupervisorDetails();
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


    axios.post(baseUrlProd + '/forms/form-i-1/student/' + data.studentId, data)
        .then(response => {
            console.log(response.data);

            if (response.data.success) {
                // if the API call is successful, then data is stored in the db, thus we don't let the student,
                // modify data again in the form.
                let elems = $('#form-i-1-student').find(':input');
                for (let i = 0; i < elems.length; i++) {
                    elems[i].disabled = true;
                }
            }
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

    axios.post(baseUrl + '/forms/form-i-1/supervisor/' + data.studentId, data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}

