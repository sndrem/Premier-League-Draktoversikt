'use strict';

/**
 * @ngdoc service
 * @name draktoversiktApp.MatchFactory
 * @description
 * # MatchFactory
 * Factory in the draktoversiktApp.
 */
angular.module('draktoversiktApp')
  .factory('MatchFactory', ['$firebaseArray', function ($firebaseArray) {
    // Service logic
    // ...

    var FIREBASE_MATCHES = "https://draktoversikt.firebaseio.com/nextMatches";
    var ref = new Firebase(FIREBASE_MATCHES);
    

    // Public API here
    return {
      getNextMatches: function () {
        return $firebaseArray(ref);
      }
    };
  }]);
