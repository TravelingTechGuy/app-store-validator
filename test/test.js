'use strict';

var debug = require('debug')('validate:test'),
    assert = require('assert'),
    appStoreValidator = require('../lib');

describe('app store validation tests', function() {
    var appName = 'Facebook',
        itunesAppId = '284882215',
        playAppId = 'com.facebook.katana';

    it('should verify ios app', function(done) {
        appStoreValidator.getItunesApp(itunesAppId, function(error, result) {
            debug(result);
            assert(result && result.name.indexOf(appName) !== -1, 'could not validate ios');
            done(error);
        });
    });

    it('should verify android app', function(done) {
        appStoreValidator.getPlayApp(playAppId, function(error, result) {
            debug(result);
            assert(result && result.name.indexOf(appName) !== -1, 'could not validate android');
            done(error);
        });
    });

    it('should not find non-existing ios app', function(done) {
        appStoreValidator.getItunesApp('xxxxxxxx', function(error, result) {
            debug(error);
            assert(error && error.message.indexOf('not found') !== -1, 'did not get not found for ios');
            done();
        });
    });

    it('should not find non-existing android app', function(done) {
        appStoreValidator.getPlayApp('xxxxxxxx', function(error, result) {
            debug(error);
            assert(error && error.message.indexOf('not found')  !== -1, 'did not get not found for android');
            done();
        });
    });
});