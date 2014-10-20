'use strict';
var module = angular.module('app.services');
module.factory('SimpleHttpInterceptor', ['$q', function($q) {
  var interceptor = {
    // 成功的请求方法
    'request': function(config) {
      console.log('simple request interceptor');
      return config; // 或者 $q.when(config);
    },
    // 响应成功
    'response': function(response) {
      console.log('simple response interceptor');
      return response; // 或者 $q.when(config);
    },
    // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
    'requestError': function(rejection) {
      return response; // 或新的promise
      // 或者，可以通过返回一个rejection来阻止下一步
      // return $q.reject(rejection);
    },
    // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
    'responseError': function(rejection) {
      return rejection; // 或新的promise
      // 或者，可以通过返回一个rejection来阻止下一步
      // return $q.reject(rejection);
    }
  };
  return interceptor;
}]);

module.factory('GeneralHttpInterceptor', ['$rootScope', '$q', 'SessionService', 
  function($rootScope, $q, SessionService) {
    var interceptor = {
      'request': function(req) {
        if ('template/pagination/pagination.html' !== req.url
          && 'template/modal/backdrop.html' !== req.url
          && 'template/modal/window.html' !== req.url) {
          req.params = req.params || {};
          // 当已经登录且未设定token参数时，自动附加token参数，
          if (SessionService.isSignined() && !req.params.token) {
            req.params.token = SessionService.getToken();
          }
        }
        return req;
      },      
      'response': function(resp) {
        return resp;
      },
      'responseError': function(rejection) {
        console.log('general responseError interceptor');        
        // 错误处理
        switch(rejection.status) {
        case 401:
          if (rejection.config.url!=='api/login')
            // 如果当前不是在登录页面
          $rootScope.$broadcast('auth:loginRequired');
          break;
        case 403:
          $rootScope.$broadcast('auth:forbidden');
          break;
        case 404:
          $rootScope.$broadcast('page:notFound');
          break;
        case 500:
          $rootScope.$broadcast('server:error');
          break;
        }
        return $q.reject(rejection);
      }
    };
  return interceptor;
}]);

module.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('SimpleHttpInterceptor');  
  $httpProvider.interceptors.push('GeneralHttpInterceptor');  
}]);

