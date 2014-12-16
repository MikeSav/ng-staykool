'use strict';

angular.module('ngStayApp')

  .controller('BundeslandCtrl', function ($scope, SchoolsService) {

    console.log('StayFriends GmbH Bundesland Controller');

    SchoolsService.fetchBundesland().then(function (response) {
      $scope.bundeslands = response;
    });

  });
