'use strict';
var module = angular.module('app.controllers');
module.controller('MeaningsNewController', ['$scope', '$state', 'Meaning',
  function($scope, $state, Meaning) {

    $scope.manipulationName = '新建';

    $scope.save = function() {
      Meaning.$create($scope.object).$then(function() {
        $state.go('meanings')
      });
    };

    $scope.cancel = function() {
      $state.go('meanings');
    };
  }
]);
