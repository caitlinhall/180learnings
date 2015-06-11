'use strict';

angular.module('myApp.day4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day4', {
    templateUrl: 'days/day4/day4.html',
    controller: 'Day4Ctrl'
  });
}])

.controller('Day4Ctrl', [function() {
	$(document).ready(function(){
		//this is for learning bootstrap and twitter api!!! WHAT!
		$.ajax({
			url: "/twitter",
		}).done(function(data) {
			var parsed = JSON.parse(data);
			var twitter = $("#twitter");
			if(twitter){
				for(var i = 0; i < parsed.length; i++){
			        twitter.append("<p style='margin:40px'>" + (i + 1) + ". " + parsed[i] + "</p>");
			    }
			}
		});
	});
}]);