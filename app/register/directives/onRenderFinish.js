'use strict';

angular.module('ngStayApp')

  .directive('onFinishRender', function ($timeout, $rootScope) {
    return {
      restrict: 'A',
      link: function (scope) {
        if (scope.$last === true) {
          $timeout(function () {
            $rootScope.$broadcast('ngRepeatFinished');
          });
        }
      }
    }
  });
