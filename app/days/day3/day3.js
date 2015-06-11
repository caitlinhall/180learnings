'use strict';

angular.module('myApp.day3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day3', {
    templateUrl: 'days/day3/day3.html',
    controller: 'Day3Ctrl'
  });
}])

.controller('Day3Ctrl', [function() {
	$(document).ready(function(){
		function getRandomColor() {
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
		    return color;
		}
		console.log(getRandomColor());
		$("circle").css({
	    	stroke: getRandomColor(),
	    	fill: getRandomColor()
		});
		var total = 50;
		var position = 50;
		var makeCircles = $("#makeCircles");
		for(var i = 0; i < total; i++){
			if(makeCircles){
				var color = getRandomColor();
				makeCircles.append("<svg width='1000' height='1000'><circle cx='"+ position +"' cy='"+ position +"' r='40' stroke='" + color + "' stroke-width='1' fill='" + color + "' /></svg>");
				position = position + 20;
			}
		}
	});
}]);