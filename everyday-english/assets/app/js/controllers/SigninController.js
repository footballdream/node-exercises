'use strict';
module = angular.module('app.controllers');
module.controller('SigninController', ['$scope', '$state', 'AuthService', 'blockUI', '$timeout',
  function($scope, $state, AuthService, blockUi, $timeout) {
    var DEFAULT_CAPTCHA_IMG_URL = '/api/v1/auth/captcha';
    $scope.setSigninUi();
    $scope.signinStatus = {
      userName: '',
      password: '',
      captchaCode: '',
      isShowingMessage: false,
      message: '',
      isNeedCaptcha: false,
      captchaImgUrl: ''
    }; 
    
    $scope.signin = function() {
      blockUi.start('正在登录……'); 
      AuthService.signin($scope.signinStatus.userName, 
        $scope.signinStatus.password, $scope.signinStatus.captchaCode)
      .then(function(data) {
        $timeout(function() { 
          blockUi.stop(); 
          var code = AuthService.getSigninCode();
          if (code.SUCCESSFUL === data.code) {
            $scope.$emit('UserSignined', data.userName);
            $state.go('blackboard');
          } else {
            if (true === data.isNeedCaptcha) {
              $scope.signinStatus.isNeedCaptcha = true;
              $scope.reloadCaptchaImg();
            }
            $scope.signinStatus.isShowingMessage = true;
            if (code.CAPTCHA_ERROR === data.code){
              $scope.signinStatus.message = '验证码错误。';              
            } else {
              $scope.signinStatus.message = '用户名或密码错误。';
            }
          }             
        }, 800);       
      });
      };
 
    $scope.reloadCaptchaImg = function() {
      $scope.signinStatus.captchaImgUrl = DEFAULT_CAPTCHA_IMG_URL + '?' + (new Date()).getTime();
      };      
  }
]);
