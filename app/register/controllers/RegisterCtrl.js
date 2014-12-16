'use strict';

angular.module('ngStayApp')

  .controller('RegisterCtrl', function ($scope, $routeParams, AuthService) {

    console.log('StayFriends GmbH Register Controller -', $routeParams.bund, $routeParams.town, $routeParams.town);

    $scope.bundesland = $routeParams.bund;
    $scope.town = $routeParams.town;
    $scope.schoolId = $routeParams.id;
    $scope.loaded = false;

    $scope.register = function (user) {
      AuthService.registerUser(user);
    };

  });
