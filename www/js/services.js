angular.module('starter.services', [])


  .factory('GuideFactory', function ($http, ENDPOINT, $q, $cordovaGeolocation) {

    var _zipCode = ''
    return {
      getGuide: function () {
        debugger;
        return $http.get(ENDPOINT.url + '/api/guide/' + _zipCode.long_name)
          .then(function (data) {


          })

      },

      getZipCode: function () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        return $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position ) {
            //debugger;
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            return $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long  + '&sensor=true' )
              .then(function(res){
                //debugger;
                console.log(res.data)

                  //debugger;
                _zipCode = _.chain(res.data.results)
                  .map(function (o) {
                    //debugger;
                    return o.address_components
                  }).filter(function (o) {
                  return _.some(o, function (x) {
                    //debugger;
                    return _.some(x.types, function(z){ return z == 'postal_code'})
                  })
                }).flatten()
                  .uniqBy('long_name')
                  .find(function (o) {
                    debugger
                    var isPostalCode =  _.some(o.types, function(p) {
                      debugger;
                      return p == 'postal_code'
                    })
                    return isPostalCode && o.long_name.length == 5
                  })
                  .value()
                return _zipCode
              })
          }, function (err) {
            //error
          })


      }
    }
  })

  .factory('_', ['$window', function ($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }])

  .factory('Fuse', function ($window) {
    return $window.Fuse
  })
  .factory('ModalFactory', function ($window, $rootScope) {
    return {
      autoLogin: function () {
        if (_.isEmpty($window.sessionStorage.token)) {
          debugger
          $rootScope.$broadcast('show_login', [])

        }
      }
    }
  })
