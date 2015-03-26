'use strict';

var debug = require('debug')('validate:test'),
    assert = require('assert'),
    appStoreValidator = require('../lib');

describe('Play store validation tests', function() {
    var appName = 'Facebook',
        playAppId = 'com.facebook.katana';

    it('should verify android app', function(done) {
        appStoreValidator.play.get(playAppId, function(error, result) {
            debug(result);
            assert(result && result.name.indexOf(appName) !== -1, 'could not validate android');
            done(error);
        });
    });

    it('should not find non-existing android app', function(done) {
        appStoreValidator.play.get('xxxxxxxx', function(error, result) {
            debug(error);
            assert(error && error.message.indexOf('not found')  !== -1, 'did not get not found for android');
            done();
        });
    });

    it('should search for android apps, and find at least one', function(done) {
        appStoreValidator.play.search(appName, function(error, result) {
            debug(result);
            assert(result.length > 0, 'could not find ' + appName);
            done(error);
        });
    });
});