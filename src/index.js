'use strict';

import ITunes from './api/ITunes';
import Play from './api/Play';
import {iTunes as iTunesUrls, Play as playUrls} from './urls';

/**
 * @class AppStoreValidator
 */
class AppStoreValidator {
	constructor() {
		this.iTunes = new ITunes(iTunesUrls);
		this.Play = new Play(playUrls);
	}
}

export default new AppStoreValidator();