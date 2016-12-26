angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.analytics', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/analytics.html',
        controller: 'analyticsCtrl'
      }
    }
  })

  .state('menu.favourite', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/favourite.html',
        controller: 'favouriteCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu.settings', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.addCloth', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addCloth.html',
        controller: 'addClothCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/page1')



});
