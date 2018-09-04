/* * * * *     Global Variables     * * * * */
let baseUrl = 'http://localhost:3000';
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



/* * * * * * * Forms * * * * * * */

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


    axios.post(baseUrl + '/forms/form-i-1/student/' + data.studentId, data)
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



/* * * * * * * Dashboards * * * * * * */

function getAllInternships() {
    let headerMap = new Map();

    // setting headers and their corresponding json keys.
    headerMap.set('Student ID', 'StudentId');
    headerMap.set('Student Name', 'StudentName');
    headerMap.set('Internship Start', '-');
    headerMap.set('Internship End', '-');
    headerMap.set('Forms', '-');

    axios.get(baseUrl + '/forms/form-i-1')
    .then(response => {
        if (response.data.success) {
            console.log(response.data.data);
            let table = renderInternshipsTable(headerMap, response.data.data);
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
function renderInternshipsTable(columnMap, jsonData) {
    console.log(columnMap);

    // create table and headers.
    let table = document.createElement('table');
    table.classList = 'table';

    let thead = document.createElement('thead');
    let headerTr = document.createElement('tr');

    for (let [key, value] of columnMap.entries()) {
        let th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = key;
        headerTr.appendChild(th);
    }
    thead.appendChild(headerTr);

    // create the body rows.
    let tbody = document.createElement('tbody');
    jsonData.forEach(entry => {
        let tr = document.createElement('tr');

        for (let [key, value] of columnMap.entries()) {
            let td = document.createElement('td');
            td.innerHTML = entry[value];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.append(thead, tbody);
    return table;
}