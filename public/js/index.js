/* * * * *     Event Triggers     * * * * */
// form submit for form I-1, student perspective.
$('#btn-form-i-1-student').on('click', function () {
    getFormI1StudentDetails();
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


    axios.post('http://localhost:3000/forms/form-i-1', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}