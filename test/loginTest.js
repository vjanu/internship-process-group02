var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:3000";

describe("Login to system", function() {
    describe("POST /", function() {
        it("returns status code 200", function(done) {
            var data = {
                userEmail: "vira@gmail.com",
                userPassword: "123"
            }
            request.post(
                base_url+'/login',
                { json: data },
                function (error, response, body) {
                    assert.equal(200, response.statusCode);
                    done();
                }
            );
        });
    });
});