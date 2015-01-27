'use strict';

var nocker     = require('./tools/nocker.js');
var expect = require('chai').expect;
var testsInfo = require('./tests');

describe('change-api petition endpoint', function () {
  
  var client = nocker.createClient();
  var resourceTests = testsInfo.tests.filter(function(index) {
    return index.resource === 'petitions';
  });

  it('Getting petitions by ID should throw an error for id missing', function () {
    expect(function () {
      client.petitions.getIdByUrl();
    }).to.throw('a petition url is required');
  });

  it('Getting petitions by ID should throw an error for callback missing', function () {
    expect(function () {
      client.petitions.getIdByUrl('fakeID');
    }).to.throw('a callback is required');
  });

  it('Getting petitions by ID should throw an error for callback missing', function () {
    expect(function () {
      client.petitions.getIdByUrl('fakeID');
    }).to.throw('a callback is required');
  });

    //Mocking each API resource calls
    for (var k = 0; k < resourceTests.cases.length; k++) {
      var ctest = resourceTests.cases[k];
      //Pushing to the queue
      var opts= {
        resource: resourceTests.resource,
        ctest: ctest
      };
    }  
});