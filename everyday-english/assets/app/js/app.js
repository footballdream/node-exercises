'use strict';
var module = angular.module('app', ['ui.router', 'ui.bootstrap', 'blockUI',
  'app.filters',
  'app.services',
  'app.directives',
  'app.controllers',
  'rcForm',
  'angularBootstrapNavTree'
]);
module.config(['blockUIConfig', function(blockUIConfig) {
  blockUIConfig.message = '请等待……';
  blockUIConfig.delay = 100;
  // blockUIConfig.autoInjectBodyBlock = false;  
}]);
module.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("blackboard");
  $stateProvider
    // blackboard
    .state('blackboard', {
      url: '/blackboard',
      templateUrl: '/app/partials/blackboard/home.html',
      controller: 'BlackboardController'
    })
    // signin
    .state('signin', {
      url: '/signin',
      templateUrl: '/app/partials/signin/home.html',
      controller: 'SigninController'
    })
    // categories home
    .state('categories', {
      url: '/categories',
      templateUrl: '/app/partials/categories/home.html',
      controller: 'CategoriesController'
    })
    // new category
    .state('newCategory', {
      url: '/categories/new',
      templateUrl: '/app/partials/categories/form.html',
      controller: 'CategoriesNewController'
    })
    // update category
    .state('updateCategory', {
      url: '/categories/:id',
      templateUrl: '/app/partials/categories/form.html',
      controller: 'CategoriesUpdateController'
    })
    // words home
    .state('words', {
      url: '/words',
      templateUrl: '/app/partials/words/home.html',
      controller: 'WordsController'
    })
    // new word
    .state('newWord', {
      url: '/words/new',
      templateUrl: '/app/partials/words/form.html',
      controller: 'WordsNewController'
    })
    // update word
    .state('updateWord', {
      url: '/words/:id',
      templateUrl: '/app/partials/words/form.html',
      controller: 'WordsUpdateController'
    })
    // meanings home
    .state('meanings', {
      url: '/meanings',
      templateUrl: '/app/partials/meanings/home.html',
      controller: 'MeaningsController'
    })
    // new meaning
    .state('newMeaning', {
      url: '/meanings/new',
      templateUrl: '/app/partials/meanings/form.html',
      controller: 'MeaningsNewController'
    })
    // update meaning
    .state('updateMeaning', {
      url: '/meanings/:id',
      templateUrl: '/app/partials/meanings/form.html',
      controller: 'MeaningsUpdateController'
    })
    // sentences home
    .state('sentences', {
      url: '/sentences',
      templateUrl: '/app/partials/sentences/home.html',
      controller: 'SentencesController'
    })
    // new sentence
    .state('newSentence', {
      url: '/sentences/new',
      templateUrl: '/app/partials/sentences/form.html',
      controller: 'SentencesNewController'
    })
    // update sentence
    .state('updateSentence', {
      url: '/sentences/:id',
      templateUrl: '/app/partials/sentences/form.html',
      controller: 'SentencesUpdateController'
    });
}]);

module.run(['$rootScope', '$state', 'SessionService', 
  function($rootScope, $state, SessionService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams) {
        // 用户未登录，导航到登录视图
        if (!SessionService.isSignined()) {
          if ('signin' !== toState.name) {
            event.preventDefault();
            $state.go('signin');
          }
        }
      });
}]);


