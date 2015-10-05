'use strict';

/**
 * @ngdoc service
 * @name draktoversiktApp.TeamFactory
 * @description
 * # TeamFactory
 * Factory in the draktoversiktApp.
 */
angular.module('draktoversiktApp')
  .factory('TeamFactory',['$firebaseArray', function ($firebaseArray) {
    // Service logic
    // ...
    var FIREBASE_TEAMS = "https://draktoversikt.firebaseio.com/teams";
    var ref = new Firebase(FIREBASE_TEAMS);


    // Public API here
    return {
      
      getTeams: function () {
        return $firebaseArray(ref);
      },

      getTeam: function(teamId) {
        return $firebaseArray(ref.child(teamId));
      }
    };
  }]);
