/**
 * Created by Nem on 6/27/15.
 */
var app = angular.module('ss.services', [])
  .factory('N', function () {

    var _netflix_shows = []

    return {
      setShows: function (shows) {
        _netflix_shows = shows
      },
      getShows: function () {
        var f = new Fuse(_netflix_shows, {threshold: .2});
        return f;
      }

    }
  })

app.run(function ($http, Fuse, N) {

  //$http.get('/netflixable/')
  //  .then(function (data) {
  //
  //    N.setShows(data.data)
  //  })
})


app.factory('PackageFactory', ['$http', '$q', '_', 'ENDPOINT' ,function ($http, $q, _, ENDPOINT) {
  // ;

  var _package = {};

  var _env = ""

  var _test = 1;


  return {
    setPackage: function (ssPackage) {

      _package = ssPackage;

      if (!_.isEmpty(ssPackage)) {
        this.postPackage(ssPackage)
      }

    },

    postPackage: function (ssPackage) {

      //debugger;
      $http.post(ENDPOINT.url + '/api/package/', ssPackage);
    },

    getPackage: function () {
      return _package;
    },

    getSSTest: function () {
      // ;
      return _test;
    },

    updatePackageChannels: function (scope) {
      //debugger;

      if (scope.package.content.length == 0) {
        scope.package.providers = [];
      }




    },

    totalServiceCost: function () {


      var t = 0;

      var pkg = _package;
      if (!_.isEmpty(pkg.content)) {

        t = _.map(pkg.providers, function (elem) {
          return elem.price;
        })

        t = _.compact(t);

        t = _.reduce(t, function (total, n) {
          return total + n
        })
      }

      t = _.round(t, 2)

      return t


    },
    totalHardwareCost: function () {


      var t = 0;

      var pkg = _package;


      t = _.map(pkg.hardware, function (elem) {
        return elem.retail_cost;
      })

      t = _.compact(t);

      t = _.reduce(t, function (total, n) {
        return total + n
      })


      t = _.round(t, 2)

      return t


    }
  }


}]);


app.run(function (PackageFactory, $http, http, $rootScope, ENDPOINT) {
  $http.get(ENDPOINT.url + '/api/package/')
    .then(function (data) {
      $rootScope.env = data.data.env



      console.log(data);

      if (data.data == "") {
        http.getPackage()
          .then(function (data) {
            PackageFactory.setPackage(data)
          })
      } else {
        PackageFactory.setPackage(data.data)
      }
    })
});
