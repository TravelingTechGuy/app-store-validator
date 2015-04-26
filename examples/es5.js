'use strict';

var appStoreValidator = require('../lib');

var iTunesFacebook = '284882215';
appStoreValidator.iTunes.get(iTunesFacebook, function(error, result) {
	if(error) {
		console.error(error);
	}
	else {
		console.dir(result);
	}
});

var playFacebook = 'com.facebook.katana';
appStoreValidator.Play.get(playFacebook, function(error, result) {
	if(error) {
		console.error(error);
	}
	else {
		console.dir(result);
	}
});