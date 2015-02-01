'use strict';

var nocker = require('./tools/nocker.js');
var testsInfo = require('./tests');

describe('change-api petition endpoint', function () {

  var client = nocker.createClient();
  var resourceTests = testsInfo.tests.filter(function (index) {
    return index.resource === 'petitions';
  });

  var methods = ['getIdByUrl', 'getByID', 'getByUrl'];

  //Test parameters and callbacks missing
  for (var i = 0; i < methods.length; i++) {
    nocker.testRequirements(client, resourceTests[0].resource, methods[i]);
  }

  //Mocking each API resource calls and creating the test
  for (var k = 0; k < resourceTests[0].cases.length; k++) {
    var ctest = resourceTests[0].cases[k];
    nocker.loadCall(ctest.url, ctest.verb, ctest.name, ctest.params);
    nocker.createTest(client, resourceTests[0].resource, ctest);
  }
});