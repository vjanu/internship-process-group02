'use strict'

var chai = require('chai');
var expect = chai.expect;

chai.should();

function returnName(name){
    return name;
};

function getUserStatus(id){
    let status = true;
    if(id == 'success'){
        status = true;
    } else if(id == 'fail'){
        status = false;
    }
    return status;
}

describe('Sample Unit test', function(){
    it('returns same', function(){
        returnName('vira').should.equal('vira');
    });
});

describe('Checking For Registered User', function(){
    it('returns status of registered user', function(){
        getUserStatus('success').should.equal(true);
    });
});