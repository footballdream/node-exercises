'use strict';
var module = angular.module('app.controllers');
module.controller('AppController', ['$scope', 
  function($scope) {
    $scope.showingTopNav = false;
    $scope.showingSideNav = false;
    
    $scope.$on("TopNavShowingChanged",   
      function (event, msg) {
        var showing = 'true' === msg;
        if ($scope.showingTopNav !== showing) {
          $scope.showingTopNav = showing;
          $scope.$broadcast("TopNavShowingChanged", msg);
         }
      });  
    
    $scope.$on("SideNavShowingChanged",   
      function (event, msg) {
        var showing = 'true' === msg;
        if ($scope.showingSideNav !== showing) {
          $scope.showingSideNav = showing;
          $scope.$broadcast("SideNavShowingChanged", msg);          
        }
      });     
  }
]);
