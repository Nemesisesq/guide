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
  .controller('ShowDetailController', function ($scope, $stateParams, PackageFactory, $timeout, $http, $ionicNavBarDelegate, $ionicHistory) {
    // $rootScope.hideTabs = true;
    // $('.tab-nav').hide()
    var id = $stateParams.showID;

    $ionicNavBarDelegate.showBackButton(true)

    $scope.id = id

    $scope.show = PackageFactory.getShow(id)

    // debugger;

    $timeout(function () {


      var nav = $('ion-nav-view').height();
      var showDetail = $('.show-detail').height();
      var btn = $('.show-pane ~ button').height();
      var header = $('.title').height()
      var rest = nav - showDetail - btn - header
      $('.content-detail-page').css({'margin-top': $('.show-detail').height(), 'height': rest})

    }, 100);


    if ($scope.show.detail == undefined) {
      $http.get($scope.show.url)
        .then(function (res) {
          $scope.show = res.data;
          $scope.s = $scope.show.guidebox_data
        })
    } else {

      $scope.s = $scope.show.guidebox_data
    }

    $scope.live = []
    $scope.onDemand = []
    $scope.binge = []
    $scope.payPerView = []
    // debugger;

    var channels = _($scope.show.channels).concat($scope.show.guidebox_data.sources.web.episodes.all_sources).value()

    _.forEach(channels, function (elem) {
      if (elem.is_over_the_air || elem.on_sling) {
        $scope.live.push(elem)

      } else if (elem.name == "Netflix") {
        $scope.binge.push(elem)
      } else if (elem.type == 'purchase') {
        $scope.payPerView.push(elem)

      } else if (elem.type == 'subscription' || elem.display_name == 'Hulu') {
        $scope.onDemand.push(elem)
      }

    })

    $scope.ToggleShowToPackage = function (i) {
      // debugger;

      var package = PackageFactory.getPackage()

      _.some(package.data.services, i) ? _.pull(package.data.services, i) : package.data.services.push(i)

      PackageFactory.setPackage(package)

    }

    $scope.chosenService = function (i) {

      debugger
      var package = PackageFactory.getPackage()

      if (i) {

        return _.some(package.data.services, i)
      }

      return false

    }

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
