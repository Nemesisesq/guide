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


app.factory('PackageFactory', ['$http', '$q', '_', 'ENDPOINT', '$localstorage', function ($http, $q, _, ENDPOINT, $localstorage) {
  // ;

  var _package = $localstorage.getObject('package') || {};

  var _env = ""

  var _test = 1;


  return {

    getShow: function(id){
        var r = _.find(_package.data.content, function(o){
          return o.guidebox_data.id == id;
        })
      return r
    },
    setPackage: function (ssPackage) {

      _package = ssPackage;

      $localstorage.setObject('package', _package)

      if (!_.isEmpty(ssPackage)) {
        this.postPackage(ssPackage)
      }

    },

    postPackage: function (ssPackage) {

      //debugger;
      $http.put(ssPackage.url, ssPackage);
    },

    getPackage: function () {
      return _package;
    },

    getSSTest: function () {
      // ;
      return _test;
    }
  }


}]);


app.run(function (PackageFactory, $http, ENDPOINT, http, $rootScope) {
  $http.get(ENDPOINT.url() + '/api/package/')
    .then(function (data) {
      //debugger
      //$rootScope.env = data.data.env

      console.log(data);

      data = data.data.results[0]
      PackageFactory.setPackage(data)

    })
});
