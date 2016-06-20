'use strict';

/**
 * @ngdoc function
 * @name draktoversiktApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the draktoversiktApp
 */
angular.module('draktoversiktApp')
  .controller('MainCtrl', ['$scope', '$firebaseArray', 'TeamFactory', 'MatchFactory', '$q' ,function($scope, $firebaseArray, TeamFactory, MatchFactory, $q) {

    $scope.teams = TeamFactory.getTeams();

    $scope.nextMatches = MatchFactory.getNextMatches();

    MatchFactory.getTimeOfUpdate().then(function(data) {
       $scope.dateUpdated = data;
    })

  	$scope.allTeams = true;


    /*
      Traverserer gjennom lagene og viser bare de to man har trykket på.
    */
  	$scope.getTeams = function(homeTeam, awayTeam) {

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
      $scope.selectedTeams = selectedTeams;
  	};

    $scope.openTwitter = function(homeTeam, awayTeam) {
      homeTeam = checkTeam(homeTeam);
      awayTeam = checkTeam(awayTeam);
      var twitter = "http://twitter.com/";
      
      getTwitterAccount(homeTeam, awayTeam).then(function(data) {
        for(var i in data) {
          window.open(twitter + data[i], '_blank');
        }
      });      
    }

    function getTwitterAccount(homeTeam, awayTeam) {
      var def = $q.defer();
      var accounts = [];
      angular.forEach($scope.teams, function(value, key) {
        if(value.teamName === homeTeam || value.teamName === awayTeam) {
         accounts.push(value.twitter);
         
        } 
      })
      def.resolve(accounts);
      return def.promise;
    }

    /*
      Viser alle lagene.
    */
  	$scope.resetTeams = function() {
  		$scope.allTeams = true;
  		$scope.selectedTeams = [];
      $scope.textSearch = "";
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
