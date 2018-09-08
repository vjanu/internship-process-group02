var chai = require('chai');
var request = require("request");
var base_url = "http://localhost:3000";
var assert = chai.assert;

const response1 = require('./response');

    describe("Load Student Dashboard", function() {
        describe("POST /student/dashboard", function() {
            it("returns status code 200", function(done) {
                var data = {
                studentId : "IT16080808"
                }
                request.post(
                    base_url+'/student',
                    { json: data },
                    function (error, response, body) {
                        assert.equal(200, response1.statusCode);
                        done();
                    }
                );
            });
        });
    });