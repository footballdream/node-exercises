'use strict';
module = angular.module('app.controllers');
module.controller('SigninController', ['$scope', '$state', 'AuthService',
  function($scope, $state, AuthService) {
    $scope.setSigninUi();
    $scope.signinStatus = {
      userName: '',
      password: '',
      isShowingMessage: false,
      message: ''
    }; 
    
    $scope.signin = function() {
      AuthService.signin($scope.signinStatus.userName, $scope.signinStatus.password)
      .then(function(data) {
        var code = AuthService.getSigninCode();
        if (code.SUCCESSFUL === data.code) {
          $state.go('blackboard')
        } else {
          $scope.signinStatus.isShowingMessage = true;
          $scope.signinStatus.message = '用户名或密码错误。';
        }
      });
    };
  }
]);
