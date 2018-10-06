var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:3000";

describe("Fetch assigned intern's form I-1 details", function() {
    describe("GET /", function() {
        it("returns status code 200", function(done) {
            let supervisorEmail = 'vira@gmail.com';
            request.get(
                base_url+'/supervisor/form-i-1/' + supervisorEmail,
                function (error, response, body) {
                    assert.equal(200, response.statusCode);
                    done();
                }
            );
        });
    });
});