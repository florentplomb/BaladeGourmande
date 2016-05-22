'use strict';

/**
 * @ngdoc overview
 * @name baladeMapApp
 * @description
 * # baladeMapApp
 *
 * Main module of the application.
 */
 var appMap = angular.module('mapEditor', [
  'ngRoute',
  'leaflet-directive',
  'ui.router',
  'uiRouterStyles'
  ]);

 appMap.config(function($stateProvider, $urlRouterProvider) {  
   //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider 
  .state('editor', {
    url:'/editor',
    templateUrl: 'views/editor.html',
    controller: 'EditorCtrl',
    data: {
      css: 'styles/editor.css'
    }
  })
  .state('map', {
    url:'/map',
    templateUrl: 'views/map.html',
    controller: 'MapCtrl',
    data: {
      css: 'styles/map.css'
    }
   })
  // .state('adrienMap', {
  //   url:'/adrienMap',
  //   templateUrl: 'views/adrienMap.html',
  //   controller: 'AdrienMapCtrl',
  //   data: {
  //     css: 'styles/map.css'
  //   }
  // })
  // .state('adrienEditor', {
  //   url:'/adrienEditor',
  //   templateUrl: 'views/adrienEditor.html',
  //   controller: 'AdrienEditorCtrl',
  //   data: {
  //     css: 'styles/editor.css'
  //   }
  // })
  //   .state('romainMap', {
  //   url:'/romainMap',
  //   templateUrl: 'views/romainMap.html',
  //   controller: 'RomainMapCtrl',
  //   data: {
  //     css: 'styles/map.css'
  //   }
  // })
  // .state('romainEditor', {
  //   url:'/romainEditor',
  //   templateUrl: 'views/romainEditor.html',
  //   controller: 'RomainEditorCtrl',
  //   data: {
  //     css: 'styles/editor.css'
  //   }
  // })

});

