'use strict';

module.exports = function users(request) {

  /**
   * Gets a user id by url
   *
   * @param {string} url - Url of the petition
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
   * @param {string} id - Id of the user
   * @param {function} callback receiving error, response and result
   */
  function getPetitions(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('a user id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'users/' + id + '/petitions';
    request('GET', route, {}, callback);
  }

  /**
   * Gets all signed petitions by a user identified by id
   *
   * @param {string} id - Id of the user
   * @param {function} callback receiving error, response and result
   */
  function getSignatures(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('a user id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'users/' + id + '/signatures/petitions';
    request('GET', route, {}, callback);
  }

  return {
    'getIdByUrl': getIdByUrl,
    'getByID': getByID,
    'getPetitions': getPetitions,
    'getSignatures': getSignatures
  };
};