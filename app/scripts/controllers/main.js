'use strict';

/**
 * @ngdoc function
 * @name draktoversiktApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the draktoversiktApp
 */
angular.module('draktoversiktApp')
  .controller('MainCtrl', ['$scope', '$firebaseArray', 'TeamFactory', 'MatchFactory' ,function ($scope, $firebaseArray, TeamFactory, MatchFactory) {
   	
    $scope.teams = TeamFactory.getTeams();

    $scope.nextMatches = MatchFactory.getNextMatches();

  	$scope.allTeams = true;



  	$scope.getTeams = function(homeTeam, awayTeam) {

      var teams = $scope.teams;
      $scope.allTeams = false;
      $scope.selectedTeams = [];
      var selectedTeams = [];
      console.log(homeTeam == 'Everton');

      for(var i in teams) {
        if(teams[i].teamName == homeTeam) {
          selectedTeams.push(teams[i]);
        } else if (teams[i].teamName == awayTeam) {
          selectedTeams.push(teams[i]);
        }
      }
      $scope.selectedTeams = selectedTeams;
        		
  	};

  	$scope.resetTeams = function() {
  		$scope.allTeams = true;
  		$scope.selectedTeams = [];
  	}

  }]);
