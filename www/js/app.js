// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('streamsavvy', ['ionic',
    'starter.controllers',
    'guide.directives',
    'starter.services',
    'ss.login',
    'ss.services',
    'search',
    'ui.bootstrap',
    'ngResource',
    'ion-sticky',
    'ngCordova',
  ])
  .config(['$resourceProvider', '$ionicConfigProvider', function ($resourceProvider, $ionicConfigProvider) {
    // Don't strip trailing slashes from calculated URLs``
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $ionicConfigProvider.tabs.position('bottom')
  }])
  .constant('ENDPOINT', {
    url: function () {
      if ((/localhost/).test(document.location.hostname)) {
        return 'http://localhost:8000'
      } else {
        return 'http://ss-ux.herokuapp.com'

      }
    }
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
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
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
          }
        }
      })
      .state('dash-detail', {
        url: '/dash/:showID ',
        templateUrl: 'templates/show-detail.html',
        controller: 'ShowDetailController'
      })
      .state('dash-detail.desc', {
        url: '/description',
        views: {
          'detail': {
            templateUrl: 'templates/show-detail-description.html',
            controller: 'ShowDetailController'
          }
        }
      })
      .state('dash-detail.services', {
        url:'/services',
        views : {
          'detail': {
            templateUrl: 'templates/choose-how-watch.html',
            controller: 'ShowDetailController'
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
      //        templateUrl: 'templates/show-detail.html',
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
