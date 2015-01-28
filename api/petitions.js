'use strict';

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
   * Gets an petition by id
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
   * Gets an petition by url
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

  return {
    getIdByUrl: getIdByUrl,
    getByID: getByID,
    getByUrl: getByUrl
  };
};