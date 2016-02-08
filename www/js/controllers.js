angular.module('starter.controllers', [])

  .controller('GuideController', function ($scope, GuideFactory, _) {
    $scope.guide = []
    GuideFactory.getGuide()
      .then(function (data) {
        $scope.guide = data

      })
    $scope.hello = 'world'

    $scope.$watch('guide', function () {


      return $scope.guide
    })

  })

  .controller('DashController', function ($scope, _) {
    $scope.hello = 'world';

    var h = angular.element('.title').height()
    console.log(h)

    $('.search').css('margin-top',h +"px")

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
//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})
//
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.loginForm = true;
});
