'use strict';

angular.module('myApp.day1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day1', {
    templateUrl: 'days/day1/day1.html',
    controller: 'Day1Ctrl'
  });
}])

.controller('Day1Ctrl', [function() {
	$(document).ready(function(){
		var ready = false;
		if ('speechSynthesis' in window) {
			ready = true;
			// do the speaking...
			// learned this technique from...
			// http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API
			//Declare the speech object & set attributes
			var msg = new SpeechSynthesisUtterance('Facebook news feeds are full of garbage');
			msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Cellos'; })[0];
			speechSynthesis.speak(msg);

		}
		if(!ready){
			$("#content p").text("");
			$("#content h1").text("It appears that either this demo needs more work or your web browser doesn't yet support speech synthesis.");
		}
	});
}]);