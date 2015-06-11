'use strict';

angular.module('myApp.day6', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day6', {
    templateUrl: 'days/day6/day6.html',
    controller: 'Day6Ctrl'
  });
}])

.controller('Day6Ctrl', [function() {
	$(document).ready(function(){
		// set up hover panels
		// although this can be done without JavaScript, we've attached these events
		// because it causes the hover to be triggered when the element is tapped on a touch device
		$('.hover').hover(function(){
			$(this).addClass('flip');
		},function(){
			$(this).removeClass('flip');
		});
	});
}]);