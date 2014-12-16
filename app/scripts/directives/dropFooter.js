'use strict';

angular.module('ngStayApp')

  .directive('dropFooter', function ($window) {
    return {
      restrict: 'A',
      scope: false, // don't really need this as false is the default!
      link: function (scope, element) {

        scope.$on('ngRepeatFinished', function () {
          console.log('ngRepeatFinished... pretty cool huh?');
          renderFooter();
        });

        function renderFooter() {

          // get the height of the viewport and the page, if the viewport is larger...
          var screenHeight = $window.innerHeight,// no ie8, could also use: angular.element(window)[0].innerHeight,
            crossBrowserDocumentHeight = Math.max(
              $window.document.body.scrollHeight, $window.document.documentElement.scrollHeight,
              $window.document.body.offsetHeight, $window.document.documentElement.offsetHeight,
              $window.document.body.clientHeight, $window.document.documentElement.clientHeight
            ),
            tempCSS;

          if (crossBrowserDocumentHeight > (screenHeight + element[0].offsetHeight)) {
            tempCSS = {
              'position': 'inherit'
            };

          } else {
            tempCSS = {
              'position': 'absolute',
              'width': '100%',
              'top': screenHeight + 'px'
            };

          }

          element.css(tempCSS);
        }

        // render this first... we use it when we don't have ng-repeat too!
        renderFooter();

      }
    }
      ;

  })
;
