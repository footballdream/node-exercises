'use strict';
module = angular.module('app.controllers');
module.controller('SigninController', ['$scope', '$state', 'AuthService', 'blockUI', '$timeout',
  function($scope, $state, AuthService, blockUi, $timeout) {
    var DEFAULT_CAPTCHA_IMG_URL = '/api/v1/auth/captcha';
    $scope.setSigninUi();
    $scope.signinStatus = {
      userName: '',
      password: '',
      isShowingMessage: false,
      message: '',
      isNeedCaptcha: true,
      captchaImgUrl: DEFAULT_CAPTCHA_IMG_URL
    }; 
    
    $scope.signin = function() {
      blockUi.start('正在登录……'); 
      AuthService.signin($scope.signinStatus.userName, $scope.signinStatus.password)
      .then(function(data) {
        $timeout(function() { 
          blockUi.stop(); 
          var code = AuthService.getSigninCode();
          if (code.SUCCESSFUL === data.code) {
            $scope.$emit('UserSignined', data.userName);
            $state.go('blackboard');
          } else {
            $scope.signinStatus.isShowingMessage = true;
            $scope.signinStatus.message = '用户名或密码错误。';
          }             
        }, 800);       
      });
      };
 
    $scope.reloadCaptchaImg = function() {
      $scope.signinStatus.captchaImgUrl = DEFAULT_CAPTCHA_IMG_URL + '?' + (new Date()).getTime();
      };      
  }
]);
