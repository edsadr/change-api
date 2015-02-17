#!/usr/bin/env node

var changeApi = require('../../index.js');
var nockBack = require('nock').back;
var fs = require('fs');
var path = require('path');
var async = require('async');
var replace = require('replace');
var apiKey = process.env.CHANGE_API_KEY;
var apiSecret = process.env.CHANGE_API_SECRET;
var testsPath = path.join(__dirname, '../testinfo/');
var err;

//Creating the real client
var client = changeApi.createClient({
  api_key: apiKey
});

//Nock settings
nockBack.fixtures = testsPath;
nockBack.setMode('record');

//Loading all requests info from the json file
var testsInfo = require('../tests');

//Creating a queue processing a single request every time
var q = async.queue(function (params, callback) {
  nockBack(params.ctest.name + '.json', {}, function (nockDone) {
    client[params.resource][params.ctest.method](params.ctest.args,
      function () {
        nockDone();
        callback(null, params.ctest.name);
      });
  });
}, 1);

//Function checking if the file exist
var fileExist = function (file) {
  try {
    fs.statSync(file).isFile();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      console.err(e.message);
      process.exit(1);
    }
  }

  return true;
};

//Callback for each element in the queue
var afterProcess = function (err, name) {
  if (err) {
    throw err;
  }
  console.log('Processing ' + name);
};

//Processing all requests in the json file
for (var i = 0; i < testsInfo.tests.length; i++) {
  //Processing each API resource cases
  for (var k = 0; k < testsInfo.tests[i].cases.length; k++) {
    var ctest = testsInfo.tests[i].cases[k];
    if (!fileExist(path.join(__dirname, '../testinfo/', ctest.name + '.json'))) {
      //Pushing to the queue
      q.push({
        resource: testsInfo.tests[i].resource,
        ctest: ctest
      }, afterProcess(err, ctest.name));
    }
  }
}

//Processing the queue
q.drain = function () {
  //Removing the original key in stored responses
  replace({
    regex: apiKey,
    replacement: 'dummyKey',
    paths: [testsPath],
    recursive: true,
    silent: true,
  });

  replace({
    regex: apiSecret,
    replacement: 'apiSecret',
    paths: [testsPath],
    recursive: true,
    silent: true,
  });
  console.log('All petitions were recorded');
};