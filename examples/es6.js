'use strict';

import appStoreValidator from 'app-store-validator';

const iTunesFacebook = '284882215';
appStoreValidator.iTunes.get(iTunesFacebook, (error, result) => {
	if(error) {
		console.error(error);
	}
	else {
		console.log(result);
	}
});

const playFacebook = 'com.facebook.katana';
appStoreValidator.Play.get(playFacebook, (error, result) => {
	if(error) {
		console.error(error);
	}
	else {
		console.log(result);
	}
});