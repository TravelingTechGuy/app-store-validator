'use strict';

/**
 * @class iTunesAPI
 */
var iTunesAPI = function() {
	var debug = require('debug')('validate:itunes');
    var request = require('request');
    var links = require('./links');

	/**
     * Process the JSON returned from iTunes API
     * @param  {Object} app JSON reply
     * @return {Object} result object
     */
    var processResult = function(app) {
        return {
            name: app.trackName,
            version: app.version,
            company: app.artistName,
            category: app.primaryGenreName,
            description: app.description,
            avgUserRating: app.averageUserRating,
            ratingsCount: app.userRatingCount
        };
    };

    /**
     * Validate iTunes App
     * @param  {String}   appStoreId iTunes app ID
     * @param  {Function} callback   callback function
     * @returns {Function} callback function with error and/or result
     */
    this.get = function(appStoreId, callback) {
        //if user included the 'id' part in the id, remove it
        if(appStoreId.indexOf('id') === 0) {
            appStoreId = appStoreId.substr(2);
        }
        var url = links.get.itunesStore + appStoreId;
        var result = null;
        request(url, {json: true}, function(error, response, body) {
            debug(url, error, response.statusCode);
            debug(body);
            if(!error && response.statusCode === 200 && body.results) {
                result = processResult(body.results[0]);  //take only first result
            }
            else {
                error = new Error('app ' + appStoreId + ' not found');
            }
            return callback(error, result);
        });
    };

    this.search = function(appName, callback) {
        var url = links.search.itunesStore + appName;
        var result = [];
        request(url, {json: true}, function(error, response, body) {
            debug(url, error, response.statusCode);
            debug(body);
            if(!error && response.statusCode === 200 && body.results && body.results.length > 0) {
                body.results.forEach(function(app) {
                    result.push(processResult(app));
                });
            }
            else {
                error = new Error('app ' + appName + ' not found');
            }
            return callback(error, result);
        });
    };
};

module.exports = new iTunesAPI();