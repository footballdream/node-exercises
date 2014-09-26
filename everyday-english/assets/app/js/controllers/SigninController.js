'use strict';
var module = angular.module('app.controllers');

// Signin Controller
module.controller('SigninController', ['$scope', '$location', 'SigninService',
  function ($scope, $location, SigninService) {
    $scope.session = {showMessage: false,
        message: ''};
    $scope.signin = function () {
        console.log('userName=' + $scope.session.username + ", password=" + $scope.session.password)
        SigninService.signin($scope.session.username, $scope.session.password).then(function (data) {
            if (201 == data.returnCode) {
                $location.path('/sentences')
            } else {
                console.log('signin failed, userName=' + $scope.session.username);
                $scope.session.showMessage = true;
                $scope.session.message = '用户名或密码错误。';
            }
        });
    };
}]);
