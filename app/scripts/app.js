'use strict';

/**
 * @ngdoc overview
 * @name draktoversiktApp
 * @description
 * # draktoversiktApp
 *
 * Main module of the application.
 */
angular
  .module('draktoversiktApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/spillerbors', {
        templateUrl: 'views/bors.html',
        controller: 'SpillerBorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
