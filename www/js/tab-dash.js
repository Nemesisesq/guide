angular.module('starter.controllers')
  .controller('DashController', function ($scope, $window, PackageFactory, $http, ENDPOINT, $rootScope, _, $timeout) {
    $scope.hello = 'world';



    $scope.showWatch = function () {
      debugger;
      $scope.howToWatch = true;

      $('.services-pane').show() ;

      $timeout(function () {
        var rest = $('ion-nav-view').height() - $('.show-detail').height() - $('content-next').height();
        $('.content-detail-page').css({'margin-top': $('.show-detail').height(), 'height' : rest})

      }, 100)
    }


    var h = angular.element('.title').height();
    console.log(h)

    $('.search').css('margin-top', h + "px");

    $scope.test = _.range(100)

    //angular.element('')

    if (_.isEmpty($window.sessionStorage.token)) {
      debugger;
      $timeout(function(){
        $rootScope.$emit('show_login', [])
      }, 500)

    }

    $scope.moveItem = function (item, fromIndex, toIndex) {
      //Move the item in the array
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };

    $scope.clearContent = function () {

      var pkg = PackageFactory.getPackage()

      pkg.data.content = []

      PackageFactory.setPackage(pkg)
    }

    $scope.showTotal = function (content) {


      var total = 0


      chans = _.uniq(_.compact(chans), function (c) {
        if (c.service !== undefined) {
          return c.service
        }
        return c.source
      })
      var prices = _.map(chans, function (elem) {
        return elem.price
      })

      total = _.reduce(prices, function (total, n) {
        return total + n;
      })

      content.totalCost = total


      total = _.round(total, 2)

      return total


    }


    $scope.totalServiceCost = PackageFactory.totalServiceCost;

    //$scope.contentTotal = function () {
    //
    //
    //    var t = 0
    //
    //    var package = $scope.package;
    //    if (package.content.length > 0) {
    //
    //         t = _.map(package.providers, function(elem){
    //            return elem.price;
    //        })
    //
    //        t = _.compact(t);
    //
    //        t = _.reduce(t, function(total, n){
    //            return total + n
    //        })
    //    }
    //
    //    t = _.round(t, 2)
    //
    //    return t
    //
    $scope.popularShows = null;

    $http.get(ENDPOINT.url() + '/api/popular-shows/')
      .success(function (data) {
        $scope.popularShows = data.results;
        return data
      })
      .then(function () {
        // ;
        //$('.popular-shows').slick();
      });


    $scope.package = PackageFactory.getPackage();

    $scope.onDemandLength = function (c) {

      return _.filter(c, function (n) {
          return n.name == 'Netflix'
        }).length > 0
    }

    $scope.delete = function (content) {
      //debugger;
      _.remove($scope.package.content, content);
      $scope.savePackage()
      PackageFactory.updatePackageChannels($scope)
    }

    $scope.prePopulateWindowProvider = function (content, prop) {
      var array = _.filter(content.content_provider, function (prov) {
        return _.includes(_.map($scope.package.providers, function (elem) {
          return elem.name
        }), prov.name)
      })

      if (prop == 'onDemand') {

        _.remove(array, function (n) {
          return n.name == 'Netflix';
        })
      } else if (prop == 'fullSeason') {

        _.remove(array, function (n) {
          return n.name != 'Netflix';
        })
      }

      return _.isEmpty(array) ? false : _.first(array).name;

    }


    $scope.$watch(function () {
      return PackageFactory.getPackage()
    }, function () {
      $scope.package = PackageFactory.getPackage();
    })


    $scope.savePackage = function () {
      PackageFactory.setPackage($scope.package)
    }

    //$scope.$watchCollection('package.content', function () {
    //
    //    PackageFactory.setPackage($scope.package)
    //})

  })
/**
 * Created by Nem on 3/30/16.
 */
