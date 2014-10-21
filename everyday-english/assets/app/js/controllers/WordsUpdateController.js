'use strict';
var module = angular.module('app.controllers');
module.controller('WordsUpdateController', ['$scope', '$state',
  '$stateParams', 'Word',
  function($scope, $state, $stateParams, Word) {
    $scope.manipulationName = '修改';

    Word.$find($stateParams.id).$then(function(object) {
      $scope.object = object;
    });

    $scope.save = function() {
      $scope.object.$save().$then(function() {
        $state.go('words');
      });
    };

    $scope.cancel = function() {
      $state.go('words');
    };
  }
]);
