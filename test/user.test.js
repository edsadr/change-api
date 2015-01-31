'use strict';

var nocker = require('./tools/nocker.js');
var expect = require('chai').expect;
var testsInfo = require('./tests');

describe('change-api user endpoint', function () {

  var client = nocker.createClient();
  var resourceTests = testsInfo.tests.filter(function (index) {
    return index.resource === 'users';
  });

  it('Getting users ID by URL should throw an error for URL missing', function () {
    expect(function () {
      client.users.getIdByUrl();
    }).to.throw('a user url is required');
  });

  it('Getting users ID by URL should throw an error for callback missing', function () {
    expect(function () {
      client.users.getIdByUrl('fakeUrl');
    }).to.throw('a callback is required');
  });

  it('Getting users by ID should throw an error for id missing', function () {
    expect(function () {
      client.users.getByID();
    }).to.throw('a user id is required');
  });

  it('Getting users by ID should throw an error for callback missing', function () {
    expect(function () {
      client.users.getByID('fakeID');
    }).to.throw('a callback is required');
  });

  var createTest = function(client, resource, ctest) {    
    client[resource][ctest.method](ctest.args, function (err, res, body) {    
      if (err) {  
        console.log(body);
        throw err;        
      }      
      describe('change-api user endpoint method '+ctest.method, function () {
        it(ctest.behavior,function (){        
          expect(res.statusCode).to.be.equal(ctest.status);          
        });
      });
    });
  };

  //Mocking each API resource calls and creating the test
  for (var k = 0; k < resourceTests[0].cases.length; k++) {    
    var ctest = resourceTests[0].cases[k];            
    nocker.loadCall(ctest.url, ctest.verb, ctest.name, ctest.params);
    createTest(client, resourceTests[0].resource, ctest);    
  }
});