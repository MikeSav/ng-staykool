'use strict';

/*

  Nice Little Tasks, going from easy to less easy

  1. Add validation messages for Login Form
  2. Add new routes, views and controllers for hrefs in the footer section
  3. Put footer in central main.html file, stop repeating
  4. Add bootstrap pagination for School and Towns list
  5. Perfect the footer directive
  6. Modulize sections so they are their own modules and have their own 'app' files

  Things for Mike

  ToDo: Home Page with Menu using UI Bootstrap - styling
  ToDo: it exists so add it to our inteceptor - $http.defaults.headers.post['XSRF-AUTH'] = "access token";

 */

/**
 * @ngdoc overview
 * @name ngStayApp
 * @description
 * # ngStayApp
 *
 * Main module of the application.
 */
angular.module('ngStayApp', [
  'ngRoute',
  'ngCookies',
  'pascalprecht.translate',
  'ngMessages',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {

    // Use HTML5 mode, remove URL hash /#
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '../home/views/main.html',
        controller: 'MainCtrl',
        publicAccess: false,
        userAccess: true
      })
      .when('/login', {
        templateUrl: '../login/views/login.html',
        controller: 'LoginCtrl',
        publicAccess: true,
        userAccess: true
      })
      .when('/passwordforget', {
        templateUrl: '../login/views/passwordforget.html',
        controller: '',
        publicAccess: true,
        userAccess: false
      })
      .when('/register', {
        templateUrl: '../register/views/bundesland.html',
        controller: 'BundeslandCtrl',
        publicAccess: true,
        userAccess: false
      })
      .when('/register/:bund', {
        templateUrl: '../register/views/towns.html',
        controller: 'TownsCtrl',
        publicAccess: true,
        userAccess: false
      })
      .when('/register/:bund/:town', {
        templateUrl: '../register/views/schools.html',
        controller: 'SchoolsCtrl',
        publicAccess: true,
        userAccess: false
      })
      .when('/register/:bund/:town/:id', {
        templateUrl: '../register/views/register.html',
        controller: 'RegisterCtrl',
        publicAccess: true,
        userAccess: true
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  // How we load the language file
  .factory('$translateStaticFilesLoader', function ($q, $http) {
    return function (options) {
      var deferred = $q.defer();
      $http({
        url: 'scripts/assets/translate/' + options.key + '.json',
        method: 'GET',
        params: ''
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function () {
        deferred.reject(options.key);
      });
      return deferred.promise;
    };
  })

  // set up the language for i18n
  .config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader();
    // ToDo: Pluralisation
    //$translateProvider.addInterpolation('$translateMessageFormatInterpolation');
    $translateProvider.preferredLanguage('de');
  })

  // constant vars...
  .constant('sfConsts', {
    'beUrl': 'http://127.0.0.1',
    'beUrlPort': '3000',
    'beFullUrl': function () {
      return this.beUrl + ':' + this.beUrlPort;
    },
    'storgageKey': 'stayfriends'
  })

  .run(function ($rootScope, $route, $location, AuthService) {

    // collect public routes...
    var routesOpenToPublic = [],
        routesClosedToUsers = [];

    // push route onto routesOpenToPublic if it has a truthy publicAccess value
    angular.forEach($route.routes, function (route, path) {
      if (route.publicAccess) {
        routesOpenToPublic.push(path);
      }

      if (route.userAccess) {
        routesClosedToUsers.push(path);
      }

    });

    // check initial to see if user is logged in
    AuthService.initialAuthCheck('stayfriendsuser');

    // Watch the path and redirect if 404, not logged in, etc...
    $rootScope.$on('$routeChangeStart', function (event, next) {


      // if user not logged in and route not public redirect!
      var closedToPublic = (-1 === routesOpenToPublic.indexOf(next.originalPath)),
          closedToUsers = (-1 === routesClosedToUsers.indexOf(next.originalPath)),
          sessionExists = AuthService.fetchKey('stayfriendsuser');

      if (closedToPublic && !sessionExists) {
        $location.path('/login');
      } else if (($location.path() === '/login' && sessionExists) || (closedToUsers && sessionExists)) {
        $location.path('/');
      }

    });

  });
