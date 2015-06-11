'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.day1',
  'myApp.day2',
  'myApp.day3',
  'myApp.day4',
  'myApp.day5',
  'myApp.day6',
  'myApp.day7',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
