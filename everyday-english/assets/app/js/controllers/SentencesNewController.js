'use strict';
var module = angular.module('app.controllers');
module.controller('SentencesNewController', ['$scope', '$state', 'Sentence',
  function($scope, $state, Sentence) {

    $scope.manipulationName = '新建';

    $scope.save = function() {
      Sentence.$create($scope.sentence).$then(function() {
        $state.go('sentences')
      });
    };

    $scope.cancel = function() {
      $state.go('sentences');
    };
  }
]);
