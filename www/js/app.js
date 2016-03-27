// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('streamsavvy', ['ionic',
    'starter.controllers',
    'starter.services',
    'ss.login',
    'ss.services',
    'search',
    'step.one',
    'step.two',
    'step.three',
    'ui.bootstrap',
    'ngResource',
    'ion-sticky',
  ])
  .config(['$resourceProvider', '$ionicConfigProvider', function ($resourceProvider, $ionicConfigProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $ionicConfigProvider.tabs.position('bottom')
  }])
  .constant('ENDPOINT', {
    url: 'http://ss-ux.heroukapp.com'
    //url: 'http://localhost:8000',
    //url: 'http://192.168.0.6:8000',
    //url : 'http://10.8.149.70:8000'
  })

  /*.constant('Endpoint', {
   url: 'http://dev.streamsavvy.tv/'
   })
   */

  .constant('CONFIG', {
    'URL': location.origin,
  })


  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }


    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'

      })

      // Each tab has its own nav history stack:
      .state('tab.guide', {
        url: '/guide',
        views: {
          'tab-guide': {
            templateUrl: 'templates/tab-guide.html',
            controller: 'GuideController'
          }
        }

      })


      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashController'
          },

          'search': {
            templateUrl: 'features/search/search.html',
            controller: 'SearchController'
          },

          'shows': {
            templateUrl: 'features/main/step-one/step-one.html',
            controller: 'StepOneController'
          },
          'services': {
            templateUrl: 'features/main/step-two/step-two.html',
            controller: 'StepTwoController'
          },
          'hardware': {
            templateUrl: 'features/main/step-three/step-three.html',
            controller: 'StepThreeController'
          }


        }
      })

      //.state('tab.chats', {
      //    url: '/chats',
      //    views: {
      //      'tab-chats': {
      //        templateUrl: 'templates/tab-chats.html',
      //        controller: 'ChatsCtrl'
      //      }
      //    }
      //  })
      //  .state('tab.chat-detail', {
      //    url: '/chats/:chatId',
      //    views: {
      //      'tab-chats': {
      //        templateUrl: 'templates/chat-detail.html',
      //        controller: 'ChatDetailCtrl'
      //      }
      //    }
      //  })
      //
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
