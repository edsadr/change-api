'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var changeApi = require('../index.js')


describe('change-api petition endpoint', function () {
  
  var client = changeApi.createClient({
    api_key: 'dummykey'
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
})