'use strict';
var module = angular.module('app.controllers');
module.controller('SentencesUpdateController', ['$scope', '$state',
  '$stateParams', 'Sentence',
  function($scope, $state, $stateParams, Sentence) {
    $scope.manipulationName = '修改';

    Sentence.$find($stateParams.id).$then(function(sentence) {
      $scope.sentence = sentence;
    });

    $scope.save = function() {
      $scope.sentence.$save();
      $state.go('sentences')
    };

    $scope.cancel = function() {
      $state.go('sentences');
    };
  }
]);
