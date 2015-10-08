'use strict';

/**
 * @ngdoc service
 * @name draktoversiktApp.MatchFactory
 * @description
 * # MatchFactory
 * Factory in the draktoversiktApp.
 */
angular.module('draktoversiktApp')
  .factory('MatchFactory', ['$firebaseArray','$q', function ($firebaseArray, $q) {
    // Service logic
    // ...

    var FIREBASE = "https://draktoversikt.firebaseio.com";
    var ref = new Firebase(FIREBASE);

    // Public API here
    return {
      getNextMatches: function () {
        return $firebaseArray(ref.child('nextMatches'));
      },

      getTimeOfUpdate: function() {
        var def = $q.defer();
        var timeOfUpdate = '';
        ref.child('date').on('value', function(snapshot) {
          timeOfUpdate = snapshot.val().dateUpdated;
          def.resolve(timeOfUpdate);
        })
        return def.promise;
      }
    };
  }]);
