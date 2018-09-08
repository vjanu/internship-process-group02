'use strict'

var chai = require('chai');
var form3 = require('../../routes/form3');
var request = require("request");
var base_url = "http://localhost:3000";

const response1 = require('./response');
var expect = chai.expect;
var assert = chai.assert;

const nock = require('nock');
chai.should();

function returnName(name){
    return name;
};


describe('Sample Unit test', function(){
    it('returns same', function(){
        returnName('form3').should.equal('form3');
    });
});

describe('Checking For Registered User', function(){
    it('returns status of registered user', function(){
        form3.getUserStatus('success').should.equal(true);
    });
});

describe('No of users who registered', function() {
    it('User Count', function() {
      var users = ['nimal','saman','vira'];
      assert.equal(3, form3.getUserCount(users));
    });
  });

  describe('Get User tests', () => {
    beforeEach(() => {
      nock('https://localhost:3000')
        .get('/users/octocat')
        .reply(200, response);
    });
  });


describe("Register to the System", function() {
    describe("POST /info/student", function() {
        it("returns status code 200", function(done) {
            var data = {
            firstName : "sunil",
            lastName: "perera",
            nic: "950779828V",
            regno: "IT16011111",
            dept: "SE",
            year: 2,
            email: "sunil@gmil.com",
            password : "123",
            }
            request.post(
                base_url+'/info/student',
                { json: data },
                function (error, response, body) {
                    assert.equal(200, response1.statusCode);
                    done();
                }
            );
        });
    });
});