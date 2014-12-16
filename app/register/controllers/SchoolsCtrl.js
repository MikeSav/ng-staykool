'use strict';

angular.module('ngStayApp')

  .controller('SchoolsCtrl', function ($scope, SchoolsService, $routeParams) {

    console.log('StayFriends GmbH Schools Controller -', $routeParams.bund, $routeParams.town);

    $scope.bundesland = $routeParams.bund;
    $scope.town = $routeParams.town;
    $scope.loaded = false;

    SchoolsService.fetchSchools().then(function (response) {
      $scope.schools = response;
      $scope.loaded = true;
    });

  });
