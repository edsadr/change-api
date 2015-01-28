'use strict';

var nocker = require('./tools/nocker.js');
var expect = require('chai').expect;
var testsInfo = require('./tests');

describe('change-api petition endpoint', function () {

  var client = nocker.createClient();
  var resourceTests = testsInfo.tests.filter(function (index) {
    return index.resource === 'petitions';
  });

  it('Getting petitions ID by URL should throw an error for URL missing', function () {
    expect(function () {
      client.petitions.getIdByUrl();
    }).to.throw('a petition url is required');
  });

  it('Getting petitions ID by URL should throw an error for callback missing', function () {
    expect(function () {
      client.petitions.getIdByUrl('fakeUrl');
    }).to.throw('a callback is required');
  });

  it('Getting petitions by ID should throw an error for id missing', function () {
    expect(function () {
      client.petitions.getByID();
    }).to.throw('a petition id is required');
  });

  it('Getting petitions by ID should throw an error for callback missing', function () {
    expect(function () {
      client.petitions.getByID('fakeID');
    }).to.throw('a callback is required');
  });

  it('Getting petitions by URL should throw an error for URL missing', function () {
    expect(function () {
      client.petitions.getByUrl();
    }).to.throw('a petition url is required');
  });

  it('Getting petitions by URL should throw an error for callback missing', function () {
    expect(function () {
      client.petitions.getByUrl('fakeUrl');
    }).to.throw('a callback is required');
  });

  var createTest = function(client, resource, ctest) {    
    client[resource][ctest.method](ctest.args, function (err, res, body) {    
      if (err) {  
        console.log(body);
        throw err;        
      }      
      describe('change-api petition endpoint method '+ctest.method, function () {
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