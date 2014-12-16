'use strict';

angular.module('ngStayApp')

  .service('StorageService', ['sfConsts', function (sfConsts) {

    // Check we have LocalStorage available
    this.hasLocalStorage = function () {
      // not going to use Modenizer for this...
      if (typeof(localStorage) === 'undefined') {
        return false;
      } else {
        return true;
      }
    };

    // Fetch a key
    this.getLocalKey = function (key) {
      return localStorage.getItem(key);
    };

    // Make a key...
    this.makeLocalKey = function (key, val) {
      localStorage.setItem(key, val);
    };

    this.makeSessionKeys = function (keyArray) {
      angular.forEach(keyArray, function (val, key) {
        key = sfConsts.storgageKey + key;
        sessionStorage.setItem(key, val);
      });
    };

    // Destroy a key
    this.removeKey = function (key) {
      localStorage.removeItem(key);
      sessionStorage.clear();
    };

  }]);
