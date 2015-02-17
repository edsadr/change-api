'use strict';

var defaults = require('defaults');
var request = require('request');
var util = require('util');
var qs = require('querystring');
var crypto = require('crypto');

module.exports = function client(options) {
  var opts = defaults(options, {
    endpoint: 'https://api.change.org/v1'
  });

  if (!opts.api_key) {
    throw new Error('api_key is required');
  }

  function _request(method, route, params, callback) {
    params = defaults(params,{
      api_key: opts.api_key
    });

    var url = util.format(
      '%s/%s',
      opts.endpoint,
      route
    );

    if (method === 'GET') {
      url = url + '?' + qs.stringify(params);
      params = undefined;
    }

    var options = {
      method: method,
      url: url,
      json: true
    };

    if (method === 'POST') {
      params = defaults(params, {
        'timestamp': new Date().toISOString(),
        'endpoint': '/v1/' + route
      });

      var apiSecret = params.api_secret;
      delete params.api_secret;

      var authKey = '';
      if(typeof params.auth_key !== 'undefined'){
        authKey = params.auth_key;
        delete params.auth_key;
      }

      var queryString = qs.stringify(params) + apiSecret +authKey;

      params = defaults(params, {
        'rsig': crypto.createHash('sha256').update(queryString).digest('hex')
      });
      
      options.form = params;
    }

    return request(options, callback);
  }

  return {
    petitions: require('./petitions')(_request),
    users: require('./users')(_request),
    organizations: require('./organizations')(_request)
  };
};