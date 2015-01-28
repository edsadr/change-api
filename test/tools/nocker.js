'use strict';

var defaults = require('defaults');
var nock = require('nock');
var util = require('util');
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
  var reply = require('../testinfo/' + name + '.json');

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
    .reply(reply[reply.length-1].status,reply[reply.length-1].response);
};