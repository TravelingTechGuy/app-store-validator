'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _appStoreValidator = require('../lib');

var _appStoreValidator2 = _interopRequireDefault(_appStoreValidator);

var iTunesFacebook = '284882215';
_appStoreValidator2['default'].iTunes.get(iTunesFacebook, function (error, result) {
	if (error) {
		console.error(error);
	} else {
		console.log(result);
	}
});

var playFacebook = 'com.facebook.katana';
_appStoreValidator2['default'].Play.get(playFacebook, function (error, result) {
	if (error) {
		console.error(error);
	} else {
		console.log(result);
	}
});

