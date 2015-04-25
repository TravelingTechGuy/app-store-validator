'use strict';

var debug = require('debug')('validate:test');
var assert = require('assert');
var appStoreValidator = require('../lib');

describe('Play store validation tests', function() {
    var appName = 'Facebook';
    var playAppId = 'com.facebook.katana';

    it('should verify android app', function(done) {
        this.timeout(10000);
        appStoreValidator.Play.get(playAppId, function(error, result) {
            debug(result);
            assert(result && result.name.indexOf(appName) !== -1, 'could not validate android');
            done(error);
        });
    });

    it('should not find non-existing android app', function(done) {
        this.timeout(10000);
        appStoreValidator.Play.get('xxxxxxxx', function(error) {
            debug(error);
            assert(error && error.message.indexOf('not found') !== -1, 'did not get not found for android');
            done();
        });
    });

    it('should search for android apps, and find at least one', function(done) {
        this.timeout(10000);
        appStoreValidator.Play.search(appName, function(error, result) {
            debug(result);
            assert(result.length > 0, 'could not find ' + appName);
            done(error);
        });
    });
});