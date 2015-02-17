'use strict';

var defaults = require('defaults');
var nock = require('nock');
var util = require('util');
var expect = require('chai').expect;
var qs = require('querystring');
var changeApi = require('../../index.js');
var nocker = exports;
var endpoint = 'https://api.change.org/v1/';
var apiKey = 'dummyKey';

nocker.createClient = function () {
  return changeApi.createClient({
    api_key: apiKey
  });
};

nocker.loadCall = function (url, method, name, params) {
  var reply = ''
  try {
    reply = require('../testinfo/' + name + '.json');
  } catch (e) {
    console.err('The test file ' + name + '.json' + 'is missing, please run `npm run record` to generate it');
    process.exit(1);
  }

  params = defaults(params, {
    api_key: apiKey
  });

  var uri = util.format('/%s', url);

  if (method === 'GET') {
    uri = util.format('/%s?%s', url, qs.stringify(params));
    params = undefined;
  }

  return nock(endpoint)
    .persist()
    .intercept(uri, method, params)
    .reply(reply[reply.length - 1].status, reply[reply.length - 1].response);
};

nocker.testRequirements = function (client, resource, method, parameter) {
  it('Method ' + method + ' should throw an error for parameter missing', function () {
    expect(function () {
      client[resource][method]();
    }).to.throw(Error);
  });

  it('Method ' + method + ' should throw an error for callback missing', function () {
    expect(function () {
      client[resource][method](parameter);
    }).to.throw(Error);
  });
};

nocker.createTest = function (client, resource, ctest) {

  client[resource][ctest.method](ctest.args, function (err, res, body) {
    describe('change-api ' + resource + ' endpoint method ' + ctest.method, function () {
      it(ctest.behavior, function () {
        expect(res.statusCode).to.be.equal(ctest.status);
      });
      it('error should be null', function () {
        expect(err).to.be.null();
      });
      it('body should not be null', function () {
        expect(body).to.not.be.null();
      });
    });
  });
};