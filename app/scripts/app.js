'use strict';

/**
 * @ngdoc overview
 * @name baladeMapApp
 * @description
 * # baladeMapApp
 *
 * Main module of the application.
 */
angular
  .module('baladeMapApp', [
    'ngRoute',
    'leaflet-directive',
    'ngDialog'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });