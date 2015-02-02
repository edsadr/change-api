'use strict';

var defaults = require('defaults');

module.exports = function organizations(request) {

  /**
   * Gets a organization id by url
   *
   * @param {string} url - Url of the petition
   * @param {function} callback receiving error, response and result
   */
  function getIdByUrl(url, callback) {
    if (typeof url !== 'string') {
      throw new Error('a organization url is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'organizations/get_id';
    request('GET', route, {
      organization_url: url
    }, callback);
  }

  /**
   * Gets a organization by id
   *
   * @param {string} id - Id of the organization
   * @param {function} callback receiving error, response and result
   */
  function getByID(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('a organization id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'organizations/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Gets petitions created by a organization identified by id
   *
   * @param {object} options - Object containing id property with Id of the organization and pagination options
   * @param {function} callback receiving error, response and result
   */
  function getPetitions(options, callback) {
    if (typeof options === 'undefined' || typeof options.id !== 'string') {
      throw new Error('an object containing a property called "id" with a petition id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var params = defaults(options, {
      page: 1,
      page_size: 10
    });

    var route = 'organizations/' + options.id + '/petitions';
    request('GET', route, params, callback);
  }

  return {
    'getIdByUrl': getIdByUrl,
    'getByID': getByID,
    'getPetitions': getPetitions
  };
};