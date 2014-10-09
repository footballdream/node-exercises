'use strict';
var module = angular.module('app.controllers');
module.controller('AppController', ['$scope', 
  function($scope) {
    $scope.mainUi = {};
    $scope.mainUi.showingTopNav = false;
    $scope.mainUi.showingSideNav = false;
    
    $scope.$on("TopNavShowingChanged",   
      function (event, msg) {
        var showing = 'true' === msg;
        if ($scope.mainUi.showingTopNav !== showing) {
          $scope.mainUi.showingTopNav = showing;
          $scope.$broadcast("TopNavShowingChanged", msg);
         }
      });  
    
    $scope.$on("SideNavShowingChanged",   
      function (event, msg) {
        var showing = 'true' === msg;
        if ($scope.mainUi.showingSideNav !== showing) {
          $scope.mainUi.showingSideNav = showing;
          $scope.$broadcast("SideNavShowingChanged", msg);          
        }
      });     
  }
]);
