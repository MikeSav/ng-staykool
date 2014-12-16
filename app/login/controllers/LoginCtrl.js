'use strict';

angular.module('ngStayApp')

  .controller('LoginCtrl', function ($scope, AuthService) {

    console.log('StayFriends GmbH Login Controller');

    $scope.errorFound = false;

    $scope.login = function (user) {
      // we have the user name and password let's see if account exists...
      AuthService.login(user).then(function (response) {

        // if response === 0 no match, show error message... using state
        $scope.errorFound = true;

        // now clear the form
        $scope.user.username = null;
        $scope.user.password = null;
        // set the form to pristine
        $scope.loginForm.$setPristine();

      });

    };

  });
