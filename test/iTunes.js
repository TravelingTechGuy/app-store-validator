'use strict';

var debug = require('debug')('validate:test');
var assert = require('assert');
var appStoreValidator = require('../lib');

describe('iTunes store validation tests', function() {
    var appName = 'Facebook';
    var itunesAppId = '284882215';
    this.timeout(10000);

    it('should verify ios app', function(done) {
        appStoreValidator.iTunes.get(itunesAppId, function(error, result) {
            debug(result);
            assert(result && result.name.indexOf(appName) !== -1, 'could not validate ios');
            done(error);
        });
    });

    it('should not find non-existing ios app', function(done) {
        appStoreValidator.iTunes.get('xxxxxxxx', function(error) {
            debug(error);
            assert(error && error.message.indexOf('not found') !== -1, 'did not get not found for ios');
            done();
        });
    });

    it('should search for ios apps, and find at least one', function(done) {
        appStoreValidator.iTunes.search(appName, function(error, result) {
            debug(result.length && result[0]);
            assert(result.length > 0, 'could not find ' + appName);
            done(error);
        });
    });
});