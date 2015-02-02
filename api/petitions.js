'use strict';

var defaults = require('defaults');

module.exports = function petitions(request) {

  /**
   * Gets a petition id by url
   *
   * @param {string} url - Url of the petition
   * @param {function} callback receiving error, response and result
   */
  function getIdByUrl(url, callback) {
    if (typeof url !== 'string') {
      throw new Error('a petition url is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'petitions/get_id';
    request('GET', route, {
      petition_url: url
    }, callback);
  }

  /**
   * Gets a petition by id
   *
   * @param {string} id - Id of the petition
   * @param {function} callback receiving error, response and result
   */
  function getByID(ids, callback) {
    if (typeof ids !== 'string') {
      throw new Error('a petition id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'petitions/' + ids;
    request('GET', route, {}, callback);
  }

  /**
   * Gets a petition by url
   *
   * @param {string} url - Url of the petition
   * @param {function} callback receiving error, response and result
   */
  function getByUrl(url, callback) {
    if (typeof url !== 'string') {
      throw new Error('a petition url is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    getIdByUrl(url, function (err, res, body) {
      if (res.statusCode !== 200) {
        throw new Error('the server replied with ' + res.statusCode);
      }

      var id = body.petition_id;

      var route = 'petitions/' + id;
      request('GET', route, {}, callback);
    });
  }

  /**
   * Gets all targets for a petitions identified by id
   *
   * @param {string} id - Id of the petition
   * @param {function} callback receiving error, response and result
   */
  function getTargets(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('a petition id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'petitions/' + id + '/targets';
    request('GET', route, {}, callback);
  }

  /**
   * Gets all signatures for a petition identified by id
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

    var route = 'petitions/' + options.id + '/signatures';
    request('GET', route, params, callback);
  }

  /**
   * Gets all reasons for a petition identified by id
   *
   * @param {object} options - Object containing id property with Id of the petition and pagination options
   * @param {function} callback receiving error, response and result
   */
  function getReasons(options, callback) {
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

    var route = 'petitions/' + options.id + '/reasons';
    request('GET', route, params, callback);
  }

  /**
   * Gets all updates for a petition identified by id
   *
   * @param {object} options - Object containing id property with Id of the petition and pagination options
   * @param {function} callback receiving error, response and result
   */
  function getUpdates(options, callback) {
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

    var route = 'petitions/' + options.id + '/updates';
    request('GET', route, params, callback);
  }

  /*
    @TODO implement:    
    - Pagination: {page,page_size} 
      (
        petitions: getSignatures, getReasons, getUpdates       
        users: getPetitions, getSignatures
        organizations.getPetitions
      )
    - Add create Signatures        
    - Authorization keys
    - Refactor petitions.js
   */

  return {
    getIdByUrl: getIdByUrl,
    getByID: getByID,
    getByUrl: getByUrl,
    getTargets: getTargets,
    getSignatures: getSignatures,
    getReasons: getReasons,
    getUpdates: getUpdates
  };
};