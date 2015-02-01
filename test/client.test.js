'use strict';

var expect = require('chai').expect;
var changeApi = require('../index.js')


describe('change-api client', function () {
  it('Client should throw an error for an API key missing', function () {
    expect(function () {
      changeApi.createClient();
    }).to.throw('api_key is required');
  });

  var client = changeApi.createClient({
    api_key: 'dummykey'
  });

  it('Client should be an object', function () {
    expect(client).to.be.an('object');
  });
})