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
    $routeProvider.when('/categories', { templateUrl: 'partials/categories/home.html', controller: 'CategoriesController' });
    // new category
    $routeProvider.when('/categories/new', { templateUrl: 'partials/categories/form.html', controller: 'CategoriesNewController' });
    // update category
    $routeProvider.when('/categories/:id', { templateUrl: 'partials/categories/form.html', controller: 'CategoriesUpdateController' });

    $routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: 'CategoriesUpdateController' });


    // 系统日志
    $routeProvider.when('/log_system', {templateUrl: 'partials/log_system.html', controller: 'LogSystemController'});
    // 安全日志
    $routeProvider.when('/log_security', {templateUrl: 'partials/log_security.html',
        controller: 'LogSecurityController'/*,
         resolve: {
         recipes: ["MultiRecipeLoader", function(MultiRecipeLoader) {
         return MultiRecipeLoader();
         }]
         }*/});
    // 终端日志
    $routeProvider.when('/log_terminal', {templateUrl: 'partials/log_terminal.html', controller: 'LogTerminalController'});
    // example
    $routeProvider.when('/example', {templateUrl: 'partials/example.html', controller: 'TableCtrl'});

    // 缺省导航到登录
    $routeProvider.otherwise({redirectTo: '/signin'});
}]);
