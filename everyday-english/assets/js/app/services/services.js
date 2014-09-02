'use strict';
var module = angular.module('app.services', ['ngResource', 'ngCookies', 'restmod']);
module.config(function(restmodProvider) {
    restmodProvider.rebase('PagedModel', {
        PACKER: 'default'
    });
});
