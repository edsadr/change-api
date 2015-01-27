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

nocker.loadCall = function (url,name,params) {
  var reply = require('../testinfo/'+name+'.json');

//Apply the right pattern mocking the reply with intercept
  return nock(endpoint)
            .persist()
            .get(url)
            .replyWithFile(reply[0].status, '../testinfo/'+name+'.json');
};

nocker.api = function (method, route, params) {
  params = defaults(params, {
    api_key: apiKey
  });

  var uri = util.format('/%s', route);

  if (method === 'GET') {
    uri = util.format('/%s?%s', route, qs.stringify(params));
    params = undefined;
  }

  return nock(endpoint).intercept(uri, method, params);
};