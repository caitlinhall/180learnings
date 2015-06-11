'use strict';

angular.module('myApp.day5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day5', {
    templateUrl: 'days/day5/day5.html',
    controller: 'Day5Ctrl'
  });
}])

.controller('Day5Ctrl', [function() {
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