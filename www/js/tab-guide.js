angular.module('starter.controllers')
  .controller('GuideController', function ($scope, GuideFactory, _, $window, PackageFactory) {

    var grid_data = [];
    var pkg = PackageFactory.getPackage();
    if (_.isEmpty($window.sessionStorage.token)) {
      //debugger
      $scope.$emit('show_login', []);

    }


    $scope.dynamicWidth = function (duration) {

      return duration * 3.5;
    };

    $scope.guide = [];

    function partitionGrid(channel_grid) {
      return _(channel_grid)
        .partition(function (elem) {

          return checkInPackage(elem)

        })
        .value()
    }

    function checkInPackage(elem) {
      var test = _.some(pkg.data.services, function (serv) {

        return new RegExp(elem.ChannelImages[0].ImageTitle).test(serv.display_name) || new RegExp(serv.display_name).test(elem.ChannelImages[0].ImageTitle)

      })
      return test


    }


    GuideFactory.getZipCode()
      .then(function (data) {
        return data

      })
      .then(GuideFactory.getGuide)
      .then(function (data) {

        // debugger;
        var channel_grid = _.reduce(data.data, function (n, sum) {

          return _.concat(n.data.GridScheduleResult.GridChannels, sum.data.GridScheduleResult.GridChannels)
        })

        $scope.gridLists = partitionGrid(channel_grid);

        debugger;


      })
    $scope.hello = 'world';

    lastScrollLeft = 0

    $('ion-content').scroll(_.debounce(function () {
      left = $(this).find('.scroll').position().left;
      if (left < 0) {
        $('.channel').css({'left': -(left)})

      } else {
        $('.channel').css({'left': 0})
      }

      $('.channel').fadeIn()


    }, 100));

    $('ion-content').scroll(function () {
      // debugger;
      var ionContentScrollLeft = $(this).find('.scroll').position().left;
        if (lastScrollLeft != ionContentScrollLeft && ionContentScrollLeft < 0 ) {
          $('.channel').hide()

          lastScrollLeft  = ionContentScrollLeft;
        }
    });


    $scope.$watch('guide', function () {


      return $scope.guide
    })

  })
/**
 * Created by Nem on 4/22/16.
 */
