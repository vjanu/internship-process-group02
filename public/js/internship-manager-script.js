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




if (CURRENT_URL.includes('internship-manager')) {
	getAllInternships();
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