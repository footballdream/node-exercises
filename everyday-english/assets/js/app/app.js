'use strict';

// declare app level module which depends on filters, and services
var appModule = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers',
    'rcForm',
    'angularBootstrapNavTree'
]);

appModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/signin', { templateUrl: 'app/partials/signin/home', controller: 'SigninController' });

    // sentences table
    $routeProvider.when('/sentences', { templateUrl: 'app/partials/sentences/home.html', controller: 'SentencesController' });
    // new sentence
    $routeProvider.when('/sentences/new', { templateUrl: 'app/partials/sentences/form.html', controller: 'SentencesNewController' });
    // update sentence
    $routeProvider.when('/sentences/:id', { templateUrl: 'app/partials/sentences/form.html', controller: 'SentencesUpdateController' });

    // category table
    $routeProvider.when('/categories', { templateUrl: 'app/partials/categories/home.html', controller: 'CategoriesController' });
    // new category
    $routeProvider.when('/categories/new', { templateUrl: 'app/partials/categories/form.html', controller: 'CategoriesNewController' });
    // update category
    $routeProvider.when('/categories/:id', { templateUrl: 'app/partials/categories/form.html', controller: 'CategoriesUpdateController' });

    $routeProvider.when('/about', { templateUrl: 'app/partials/about.html', controller: 'CategoriesUpdateController' });


    // 缺省导航到登录
    $routeProvider.otherwise({redirectTo: '/signin'});
}]);
