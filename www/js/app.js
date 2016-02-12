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
  .config(['$resourceProvider', function ($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }])
  .constant('ENDPOINT', {
    //url: 'http://localhost:8000',
    url: 'http://192.168.0.6:8000'
  })

  /*.constant('Endpoint', {
   url: 'http://dev.streamsavvy.tv/'
   })
   */

  .constant('CONFIG', {
    'URL': location.origin,
  })
  .constant('VIEW_WINDOWS', [
    {type: 'live', headerText: 'Live Over the Air.', toolTip: 'get your content as soon as it dropped.'},
    {type: 'onDemand', headerText: 'On Demand Subscription.', toolTip: 'day/+ after live airing.'},
    {type: 'fullseason', headerText: 'Binge Watch Full Seasons', toolTip: 'season behind.'},
    {
      type: 'alacarte',
      headerText: 'Watch Current Season or Episodes for a fee',
      toolTip: 'day/+ after live airing with no committment'
    }
  ])
  .constant('BANNED_CHANNELS', ['HBO Go',
    'Guidebox',
    'MSNBC',
    'HBO',
    'Dish',
    'DirecTV',
    'AT&T U-verse',
    'FX',
    'Xfinity',
    'Showtime Anytime',
    'STARZ Play'])

  .constant('SERVICE_PRICE_LIST', [
    {name: 'Netflix', price: 9.99},
    {name: 'Hulu', price: 7.99},
    {name: 'Amazon Prime', price: 8.25},
    {name: 'HBO Now', price: 14.99},
    {name: 'SlingTV', price: 20.00},
    {name: 'Over The Air', price: 0.00},
    {name: 'Showtime', price: 10.99},
    {name: 'CBS All Access', price: 5.99},
    {name: 'NBC App', price: 0.00},
    {name: 'CW Seed', price: 0.00},
    {name: 'PBS App', price: 0.00}
  ])

  .constant('MAJOR_NETWORKS', [
    'ABC'
  ])

  .constant('SLING_CHANNELS', ['ESPN',
    'ESPN2',
    'AMC',
    'Food Network',
    'A & E',
    'History',
    'TNT',
    'El Rey',
    'HGTV',
    'IFC',
    'Disney Channel',
    'Polaris +',
    'Maker',
    'TBS',
    'Travel Channel',
    'Adult Swim',
    'CNN',
    'H2',
    'Cartoon Network',
    'ABC Family',
    'Lifetime',
    'Galavision',
    'Bloomberg Television'])


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
            templateUrl: 'features/journey_one/step-one/step-one.html',
            controller: 'StepOneController'
          },
          'services': {
            templateUrl: 'features/journey_one/step-two/step-two.html',
            controller: 'StepTwoController'
          },
          'hardware': {
            templateUrl: 'features/journey_one/step-three/step-three.html',
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
    $urlRouterProvider.otherwise('/tab/guide');

  });
