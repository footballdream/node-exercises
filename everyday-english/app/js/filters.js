'use strict';

/* Filters */

var filtersModule = angular.module('app.filters', []);
filtersModule.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
filtersModule.filter('status', [function() {
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

filtersModule.filter('number2Date', [function() {
    return function(input) {
      return new Date(input);
    }
  }]);
