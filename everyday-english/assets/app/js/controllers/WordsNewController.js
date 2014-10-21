'use strict';
var module = angular.module('app.controllers');
module.controller('WordsNewController', ['$scope', '$state', 'Word',
  function($scope, $state, Word) {

    $scope.manipulationName = '新建';

    $scope.save = function() {
      Word.$create($scope.object).$then(function() {
        $state.go('words');
      });
    };

    $scope.cancel = function() {
      $state.go('words');
    };
  }
]);
