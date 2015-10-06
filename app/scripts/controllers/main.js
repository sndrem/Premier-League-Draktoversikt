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


    /*
      Traverserer gjennom lagene og viser bare de to man har trykket på.
    */
  	$scope.getTeams = function(homeTeam, awayTeam) {

      console.log(homeTeam);

      var homeTeamName = checkTeam(homeTeam.name);
      var awayTeamName = checkTeam(awayTeam.name);
      

      var teams = $scope.teams;
      $scope.allTeams = false;
      $scope.selectedTeams = [];
      var selectedTeams = [];
      

      for(var i in teams) {
        if(teams[i].teamName === homeTeamName) {
          teams[i].priority = homeTeam.priority;
          selectedTeams.push(teams[i]);
        } else if (teams[i].teamName === awayTeamName) {
          teams[i].priority = awayTeam.priority;
          selectedTeams.push(teams[i]);
        }
      }

      for(var i in selectedTeams) {
        if(selectedTeams[i].priority > selectedTeams[i++].priority) {
          var selectedTeam = selectedTeams[i];
          selectedTeams[i] = selectedTeams[i++];
          selectedTeams[i++] = selectedTeams;
        }
      }
      console.log(selectedTeams);
      $scope.selectedTeams = selectedTeams;
        		
  	};

    /*
      Viser alle lagene.
    */
  	$scope.resetTeams = function() {
  		$scope.allTeams = true;
  		$scope.selectedTeams = [];
  	};

    /*
      Sjekker om laget er Man. United eller Man. City slik at vi får ut det fulle navnet e
    */
    function checkTeam(team) {
      if(team === 'Man. United') {
        return 'Manchester United';
      } else if (team === 'Man. City') {
        return 'Manchester City'
      } else return team;
    };


  }]);
