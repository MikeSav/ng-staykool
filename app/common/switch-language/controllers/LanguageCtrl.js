'use strict';

angular.module('ngStayApp')

  .controller('LanguageCtrl', function ($scope, $translate) {

    console.log('StayFriends GmbH Language Controller');

    $scope.switchLanguage = function (lang) {
      $translate.use(lang);
    }

  });
