'use strict'

var chai = require('chai');
var form3 = require('../../routes/form3');
const response = require('./response');
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
      nock('https://api.github.com')
        .get('/users/octocat')
        .reply(200, response);
    });
  });