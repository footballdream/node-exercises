'use strict';
var module = angular.module('app.controllers');
module.controller('MeaningsUpdateController', ['$scope', '$state',
  '$stateParams', 'Meaning',
  function($scope, $state, $stateParams, Meaning) {
    $scope.manipulationName = '修改';

    Meaning.$find($stateParams.id).$then(function(object) {
      $scope.object = object;
    });

    $scope.save = function() {
      $scope.object.$save().$then(function() {
        $state.go('meanings')
      });
    };

    $scope.cancel = function() {
      $state.go('meanings');
    };
  }
]);
