'use strict';

var path = require('path');
var fs = require('fs');
var stripJsonComments = require('strip-json-comments');

/**
 * Config file abstraction
 */
class ConfigFile {
  /**
   * @param {string} configPath
   */
  constructor(configPath) {
    this._path = path.resolve(configPath);
  }

  /**
   * @return {bool}
   */
  exists() {
    return fs.existsSync(this._path);
  }

  /**
   * @returns {{}}
   */
  get values() {
    if (!this._values) {
      this._values = {};

      if (this.exists()) {
        this._values = fs.readFileSync(this._path).toString();
        this._values = stripJsonComments(this._values);
        this._values = JSON.parse(this._values);
      }
    }

    return this._values;
  }

  /**
   * @returns {string}
   */
  get path() {
    return this._path;
  }

  /**
   * Write config to file
   */
  write() {

  }
}

module.exports = ConfigFile;