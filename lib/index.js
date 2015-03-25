'use strict';

/**
 * @class AppValidator
 */
var AppValidator = function() {
    var debug = require('debug')('validate:lib');
    var request = require('request');
    var links = require('./config/links');

    /**
     * Extract number from a string
     * @param  {String} str     target string
     * @param  {Boolean} [toFloat] should float or integer be returned - default: false
     * @return {Number}         integer or Float extracted from string
     */
    var extractNumber = function(str, toFloat) {
        str = str.replace(/[^\d\.\-eE+]/g, '');
        return toFloat ? parseFloat(str) : parseInt(str);
    };

    /**
     * Process the JSON returned from iTunes API
     * @param  {Object} app JSON reply
     * @return {Object} result object
     */
    var processItunesResult = function(app) {
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
     * Parse scraped results from Play store
     * @param  {String} body HTML scraped from Play Store
     * @return {Object} result object
     */
    var processPlayResult = function(body) {
        //Sadly, there's no API for the Play store, so we have to scrape the page
        var cheerio = require('cheerio');
        var $ = cheerio.load(body);

        return {
            name: $('.document-title > div').text(),
            version: $('div.content[itemprop="softwareVersion"]').text().trim(),
            company: $('.document-subtitle > span[itemprop="name"]').text(),
            category: $('span[itemprop="genre"]').text(),
            description: $('div.id-app-orig-desc').text(),
            avgUserRating: (extractNumber($('div.current-rating').attr('style'), true) / 100 * 5).toPrecision(2),
            ratingsCount: extractNumber($('div.stars-count').text(), false)
        };
    };

    /**
     * Validate iTunes App
     * @param  {String}   appStoreId iTunes app ID
     * @param  {Function} callback   callback function
     * @returns {Function} callback function with error and/or result
     */
    this.getItunesApp = function(appStoreId, callback) {
        //if user included the 'id' part in the id, remove it
        if(appStoreId.indexOf('id') === 0) {
            appStoreId = appStoreId.substr(2);
        }
        var url = links.itunesStore + appStoreId;
        var result = null;
        request(url, {json: true}, function(error, response, body) {
            debug(url, error, response.statusCode);
            debug(body);
            if(!error && response.statusCode === 200 && body.results) {
                result = processItunesResult(body.results[0]);  //take only first result
            }
            else {
                error = new Error('app ' + appStoreId + ' not found');
            }
            return callback(error, result);
        });
    };

    /**
     * Validate Play store App
     * @param  {String}   appStoreId Play store app ID
     * @param  {Function} callback   callback function
     * @returns {Function} callback function with error and/or result
     */
    this.getPlayApp = function(appStoreId, callback) {
        var url = links.playStore + appStoreId + '&hl=en';
        var result = null;
        request(url, function(error, response, body) {
            debug(url, error, response.statusCode);
            debug(body);
            if(!error && response.statusCode === 200) {
                result = processPlayResult(body);
            }
            else {
                error = new Error('app ' + appStoreId + ' not found');
            }
            return callback(error, result);
        });
    };
};

module.exports = new AppValidator();