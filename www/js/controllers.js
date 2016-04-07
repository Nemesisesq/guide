angular.module('starter.controllers', [])

  .controller('GuideController', function ($scope, GuideFactory, _, $window, $rootScope, $q) {
    if (_.isEmpty($window.sessionStorage.token)) {
      //debugger
      $scope.$emit('show_login', [])

    }

    $scope.dynamicWidth = function (duration) {

      return duration * 3.5;
    };

    $scope.guide = [];


    GuideFactory.getZipCode()
      .then(function (data) {
        return data

      })
      .then(GuideFactory.getGuide)
      .then(function (data) {

        $scope.grid = data.GridScheduleResult.GridChannels;
        console.log(data)

      })
    $scope.hello = 'world'

    $('ion-content').scroll(function () {
      left = $(this).find('.scroll').position().left
      if (left < 0) {
        $(this).find('.channel').css({'left': -(left)})
      } else {
        $(this).find('.channel').css({'left': 0})
      }

    })

    $scope.$watch('guide', function () {


      return $scope.guide
    })

  })

  .controller('DashController', function ($scope, _) {
    $scope.hello = 'world';

    var h = angular.element('.title').height();
    console.log(h)

    $('.search').css('margin-top', h + "px");

    $scope.test = _.range(100)

    //angular.element('')

  })

  //.controller('ChatsCtrl', function($scope, Chats) {
  //  // With the new view caching in Ionic, Controllers are only called
  //  // when they are recreated or on app start, instead of every page change.
  //  // To listen for when this page is active (for example, to refresh data),
  //  // listen for the $ionicView.enter event:
  //  //
  //  //$scope.$on('$ionicView.enter', function(e) {
  //  //});
  //
  //  $scope.chats = Chats.all();
  //  $scope.remove = function(chat) {
  //    Chats.remove(chat);
  //  };
  //})
  //
  .controller('ShowDetailController', function ($scope, $stateParams, PackageFactory, $timeout, $rootScope) {
    // $rootScope.hideTabs = true;
    $('.tab-nav').hide()
    var id = $stateParams.showID;

    $scope.id = id

    $scope.show = PackageFactory.getShow(id)

    $timeout(function () {
      var rest = $('ion-nav-view').height() - $('.show-detail').height() - $('content-next').height();
      $('.content-detail-page').css({'margin-top': $('.show-detail').height(), 'height' : rest})

    }, 100)
  })

  .controller('AccountCtrl', function ($scope, $http, ENDPOINT) {
    $scope.getGuide = function () {
      debugger;
      $http.get('http://titantv.com/')
        .then(function (data) {
          $http.post(ENDPOINT.url() + '/guide_reciever/', data.data)
            .then(function (data) {
              console.log(data)

            })
        })
    }

    $scope.loginForm = true;
  });
