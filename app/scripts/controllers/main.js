'use strict';

/**
 * @ngdoc function
 * @name draktoversiktApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the draktoversiktApp
 */
angular.module('draktoversiktApp')
  .controller('MainCtrl', ['$scope', '$firebaseArray' ,function ($scope, $firebaseArray) {
   	
  	var ref = new Firebase("https://draktoversikt.firebaseio.com/matches");
  	$scope.teams = $firebaseArray(ref);

  	var nextMatchRef = new Firebase("https://draktoversikt.firebaseio.com/nextMatches");
  	$scope.nextMatches = $firebaseArray(nextMatchRef);
  	
  	console.log($scope.nextMatches);
  	$scope.allTeams = true;

  	$scope.getTeams = function(homeTeam, awayTeam) {

  		$scope.allTeams = false;


  		var teams = $scope.teams;
  			var teamArray = [];


  		for(var i in teams) {
  			if(teams[i].teamName === homeTeam || teams[i].teamName === awayTeam) {
  				teamArray.push(teams[i]);
  			}
  		}

  		$scope.selectedTeams = teamArray;

  	};

  	$scope.resetTeams = function() {
  		$scope.allTeams = true;
  		$scope.selectedTeams = false;
  	}


  }]);
