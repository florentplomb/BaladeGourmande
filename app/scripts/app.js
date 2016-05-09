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
  'leaflet-directive'
  ])
 .config(function($routeProvider) {
  $routeProvider
  .when('/map', {
    templateUrl: 'views/balademap.html',
    controller: 'BaladeMapCtrl'
  })
  .when('/adrien', {
    templateUrl: 'views/adrien.html',
    controller: 'AdrienCtrl'
  })
  .when('/editor', {
    templateUrl: 'views/editor.html',
    controller: 'EditorCtrl'
  })
  .otherwise({
    redirectTo: '/map' // faire un page d'aacceuile et renvoyer.
  });
});