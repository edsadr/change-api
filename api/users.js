'use strict';

var defaults = require('defaults');

module.exports = function users(request) {

  /**
   * Gets a user id by url
   *
   * @param {string} url - Url of the user
   * @param {function} callback receiving error, response and result
   */
  function getIdByUrl(url, callback) {
    if (typeof url !== 'string') {
      throw new Error('a user url is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'users/get_id';
    request('GET', route, {
      user_url: url
    }, callback);
  }

  /**
   * Gets a user by id
   *
   * @param {string} id - Id of the user
   * @param {function} callback receiving error, response and result
   */
  function getByID(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('a user id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'users/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Gets petitions created by a user identified by id
   *
   * @param {object} options - Object containing id property with Id of the user and pagination options
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

    var route = 'users/' + options.id + '/petitions';
    request('GET', route, params, callback);
  }

  /**
   * Gets all signed petitions by a user identified by id
   *
   * @param {object} options - Object containing id property with Id of the petition and pagination options
   * @param {function} callback receiving error, response and result
   */
  function getSignatures(options, callback) {
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

    var route = 'users/' + options.id + '/signatures/petitions';
    request('GET', route, params, callback);
  }

  return {
    'getIdByUrl': getIdByUrl,
    'getByID': getByID,
    'getPetitions': getPetitions,
    'getSignatures': getSignatures
  };
};