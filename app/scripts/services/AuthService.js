'use strict';

angular.module('ngStayApp')

  .service('AuthService', ['$http', 'StorageService', 'sfConsts', '$location', function ($http, StorageService, sfConsts, $location) {
    console.log('StayFriends GmbH - AuthService');

    this.registerUser = function (user) {

      return $http({ method: 'POST', url: sfConsts.beFullUrl() + '/register', data: user}).then(function (response) {
        StorageService.makeLocalKey('stayfriendsuser', response.data[0].uuid);
        StorageService.makeSessionKeys(response.data[0]);
        $location.path('/');
      });

    };

    this.initialAuthCheck = function (key) {

      // check if there is a cookie or a local storage value with a key!
      if (StorageService.hasLocalStorage() && StorageService.getLocalKey(key)) {

        return $http({ method: 'POST', url: sfConsts.beFullUrl() + '/fetch', data: {'key': StorageService.getLocalKey(key)}
        }).then(function (response) {
          StorageService.makeSessionKeys(response.data[0]);
        });

      } else {
        return false;
      }

    };

    this.fetchKey = function (key) {

      // check if there is a cookie or a local storage value with a key!
      if (StorageService.hasLocalStorage() && StorageService.getLocalKey(key)) {
        return StorageService.getLocalKey(key);
      } else {
        return false;
      }

    };

    this.login = function (user) {
      // speak to the REST service...
      return $http({method: 'POST', url: sfConsts.beFullUrl() + '/login', data: user}).then(function (response) {

        // We have a match!
        if (response.data.length !== 0) {
          StorageService.makeLocalKey('stayfriendsuser', response.data[0].uuid);
          StorageService.makeSessionKeys(response.data[0]);
          $location.path('/');
        } else if (response.data.length === 0) {
          // there's no match
          return 0;
        }

      });
    };

    this.logout = function () {
      StorageService.removeKey('stayfriendsuser');
      $location.path('/login');
    };

  }]);
