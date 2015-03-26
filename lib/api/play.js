'use strict';

/**
 * @class playAPI
 */
var playAPI = function() {
    var debug = require('debug')('validate:itunes');
    var request = require('request');
    var links = require('./links');

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
     * Parse scraped results from Play store
     * @param  {String} body HTML scraped from Play Store
     * @return {Object} result object
     */
    var processResult = function(body) {
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

    var processSearchResults = function(body) {
        //Sadly, there's no API for the Play store, so we have to scrape the page
        var cheerio = require('cheerio');
        var $ = cheerio.load(body);
        var results = {};
        var allApps = $('div.details');
        Object.keys(allApps).forEach(function(key) {
            var app = allApps[key];
            var result = {
                name: $(app).find('a.title').attr('title'),
                id: $(app).find('a.title').attr('href'),
                company: $(app).find('div.subtitle-container > a.subtitle').attr('title')
            };
            if(result.id) {
                result.id = result.id.split('?')[1].substr(3);
                result.url = links.get.playStore + result.id;
                results[result.id] = result;
            }
        });
        //flatten results to array
        results = Object.keys(results).map(function(key) {return results[key];});
        return results;
    };

    /**
     * Validate Play store App
     * @param  {String}   appStoreId Play store app ID
     * @param  {Function} callback   callback function
     * @returns {Function} callback function with error and/or result
     */
    this.get = function(appStoreId, callback) {
        var url = links.get.playStore + appStoreId;
        var result = null;
        request(url, function(error, response, body) {
            debug(url, error, response.statusCode);
            debug(body);
            if(!error && response.statusCode === 200) {
                result = processResult(body);
            }
            else {
                error = new Error('app ' + appStoreId + ' not found');
            }
            return callback(error, result);
        });
    };

    this.search = function(appName, callback) {
        var url = links.search.playStore + appName;
        var result = [];
        request(url, function(error, response, body) {
            debug(url, error, response.statusCode);
            debug(body);
            if(!error && response.statusCode === 200) {
                result = processSearchResults(body);
            }
            else {
                error = new Error('app ' + appName + ' not found');
            }
            return callback(error, result);
        });
    };
};

module.exports = new playAPI();