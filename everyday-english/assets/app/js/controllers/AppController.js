'use strict';
var module = angular.module('app.controllers');
module.controller('AppController', ['$scope', '$state', 'SessionService', 'AuthService', 
  function($scope, $state, SessionService, AuthService) {
    $scope.mainUi = {
      isShowingTopNav: false,
      isShowingSideNav: false
    };
    
    $scope.session = {
      userName: SessionService.getUserName()
    };
    
    $scope.setSigninUi = function() {
      $scope.mainUi.isShowingTopNav = false;
      $scope.mainUi.isShowingSideNav = false;
    };
    
    $scope.setDataMaintenanceUi = function() {
      $scope.mainUi.isShowingTopNav = true;
      $scope.mainUi.isShowingSideNav = false;
    };
    
    $scope.setReadingUi = function() {
      $scope.mainUi.isShowingTopNav = false;
      $scope.mainUi.isShowingSideNav = true;
    };    
    
    $scope.signout = function() {
      AuthService.signout(SessionService.getToken())
      .then(function(data) {
        $state.go('signin');
      })
    };
    
    $scope.$on("UserSignined",   
      function (event, msg) {
        $scope.session.userName = SessionService.getUserName();
      });     
    
    $scope.$on("UserSignouted",   
      function (event, msg) {
        // nothing to do
      });     
    
    /*    
    $scope.$on("TopNavShowingChanged",   
      function (event, msg) {
        var showing = 'true' === msg;
        if ($scope.mainUi.isShowingTopNav !== showing) {
          $scope.mainUi.isShowingTopNav = showing;
          $scope.$broadcast("TopNavShowingChanged", msg);
         }
      });  
    
    $scope.$on("SideNavShowingChanged",   
      function (event, msg) {
        var showing = 'true' === msg;
        if ($scope.mainUi.isShowingSideNav !== showing) {
          $scope.mainUi.isShowingSideNav = showing;
          $scope.$broadcast("SideNavShowingChanged", msg);          
        }
      });
    */
  }
]);
