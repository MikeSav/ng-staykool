'use strict';

// ToDo: it exists so add it to our inteceptor
angular.module('ngStayApp')

  .service('SchoolsService', ['$http', 'sfConsts', function ($http, sfConsts) {
    console.log('StayFriends GmbH - SchoolService');

    this.fetchBundesland = function () {

      return $http({method: 'GET', url: sfConsts.beFullUrl() + '/bundesland', data: {}}).then(function (response) {
        return response.data;
      });
    };

    this.fetchTowns = function () {

      return $http({method: 'GET', url: sfConsts.beFullUrl() + '/towns', data: {}}).then(function (response) {
        return response.data;
      });
    };

    this.fetchSchools = function () {

      return $http({method: 'GET', url: sfConsts.beFullUrl() + '/schools', data: {}}).then(function (response) {
        return response.data;
      });
    };

  }]);
