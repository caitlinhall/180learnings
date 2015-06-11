'use strict';

angular.module('myApp.day7', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day7', {
    templateUrl: 'days/day7/day7.html',
    controller: 'Day7Ctrl'
  });
}])

.controller('Day7Ctrl', [function() {
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