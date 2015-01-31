'use strict';

var defaults = require('defaults');
var request = require('request');
var util = require('util');
var qs = require('querystring');

module.exports = function client(options) {
  var opts = defaults(options, {
    endpoint: 'https://api.change.org/v1'
  });

  if (!opts.api_key) {
    throw new Error('api_key is required');
  }

  function _request(method, route, params, callback) {
    params = defaults(params, {
      api_key: opts.api_key
    });

    var url = util.format(
      '%s/%s',
      opts.endpoint,
      route
    );

    if (method === 'GET') {
      url = url + '?' + qs.stringify(params);
    }

    var options = {
      method: method,
      url: url,
      json: true
    };

    if (method === 'POST') {
      options.body = params;
    }

    return request(options, callback);
  }

  return {
    petitions: require('./petitions')(_request),
    users: require('./users')(_request)
  };
};