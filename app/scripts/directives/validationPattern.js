'use strict';

angular.module('ngStayApp')

  .directive('validationPattern', function ($compile) {
    return {
      prority: 1000,
      restrict: 'A',
      compile: function (element, attrs) {

        var availablePatterns = {
          'inputDefault': {
            'characters': /^[a-zA-Z]+$/,
            'minlength': '2',
            'maxlength': '25'
          },
          'inputDefaultRequired': {
            'characters': /^[a-zA-Z\s]+$/,
            'minlength': '2',
            'maxlength': '25',
            'required': true
          },
          'inputEmailRequired': {
            'minlength': '2',
            'maxlength': '25',
            'required': true
          },
          'lengthsOnly': {
            'minlength': '2',
            'maxlength': '25'
          },
          'lengthsOnlyRequired': {
            'minlength': '2',
            'maxlength': '25',
            'required': true
          },
          'inputUrl': {
            'characters': /^(https?:\/\/)?(?:(?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(?:\w{2,6}).*$/i
          },
          'inputLocation': {
            'minlength': '2',
            'maxlength': '100'
          },
          'inputLocationRequired': {
            'minlength': '2',
            'maxlength': '100',
            'required': true
          },
          'inputTextArea': {
            'minlength': '2',
            'maxlength': '1000'
          },
          'inputTextAreaRequired': {
            'minlength': '2',
            'maxlength': '1000',
            'required': true
          },
          'requiredOnly': {
            'required': true
          }

        };

        var patterns = availablePatterns[attrs.validationPattern];
        if (patterns) {
          angular.forEach(patterns, function (pattern, patternName) {
            if (patternName === 'characters') {
              element.attr('data-ng-pattern', pattern);
            } else if (patternName === 'minlength') {
              element.attr('data-ng-minlength', pattern);
            } else if (patternName === 'maxlength') {
              element.attr('data-ng-maxlength', pattern);
            } else if (patternName === 'required') {
              element.attr('required', true);
            }
          });
        }

        element.removeAttr('data-validation-pattern');

        return function ($scope, $element) {
          $compile(element)($scope, function (clonedElement) {
            $element.replaceWith(clonedElement);
          });
        };

      }
    };
  })
;
