'use strict';

/**
 * @ngdoc function
 * @name draktoversiktApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the draktoversiktApp
 */
angular.module('draktoversiktApp')
  .controller('SpillerBorsCtrl', ['$scope', function($scope) {
  	$scope.borsPlayer = {
  		text: ""
  	};

  	$scope.sum = function(data) {
  		console.log(data);
  	};

  }]);
