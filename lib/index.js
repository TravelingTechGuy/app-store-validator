'use strict';

/**
 * @class AppValidator
 */
var AppValidator = function() {
    this.iTunes = require('./api/iTunes');
    this.play = require('./api/play');
};

module.exports = new AppValidator();