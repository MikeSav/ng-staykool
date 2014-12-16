'use strict';

angular.module('ngStayApp')

  .controller('TownsCtrl', function ($scope, SchoolsService, $routeParams) {

    console.log('StayFriends GmbH Towns Controller -', $routeParams.bund );

    $scope.bundesland = $routeParams.bund;
    $scope.loaded = false;

    SchoolsService.fetchTowns().then(function (response) {
      $scope.towns = response;
      $scope.loaded = true;
    });

  });
