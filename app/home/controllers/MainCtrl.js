'use strict';

angular.module('ngStayApp')

  .controller('MainCtrl', function ($scope, AuthService) {

    $scope.logout = function () {
      AuthService.logout();
    };

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      console.log('Dropdown is now: ', open);
    };

  });

