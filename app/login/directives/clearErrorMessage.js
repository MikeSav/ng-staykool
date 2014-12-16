'use strict';

angular.module('ngStayApp')

  .directive('clearErrorMessage', function () {
    return {
      restrict: 'A',
      scope: false, // don't really need this as false is the default!
      link: function (scope, element) {

        element.bind('focus', function () {
          scope.errorFound = false;
          scope.$apply();
        });

      }
    };

  });
