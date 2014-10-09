'use strict';
var module = angular.module('app.filters', []);
module.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
module.filter('status', [function() {
    return function(input) {
      var output = 'ERROR';
      if (input) {
        output = '成功';
      } else {
        output = '失败';
      }
      return output;
    }
  }]);

module.filter('number2Date', [function() {
    return function(input) {
      return new Date(input);
    }
  }]);
