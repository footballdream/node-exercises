'use strict';
var module = angular.module('app.controllers');
module.controller('BlackboardController', ['$scope', '$location', 'Sentence',
  'MessageBoxService',
  function($scope, $location, Sentence, MessageBoxService) {
    $scope.$emit("TopNavShowingChanged", 'false');
    $scope.$emit("SideNavShowingChanged", 'true');
    
    $scope.mode = 'reading';
    $scope.showingEnglish = true;
    $scope.showingChinese = true;

    $scope.toggleShowingEnglish = function() {
      $scope.showingEnglish = !$scope.showingEnglish;
    };

  }
]);
