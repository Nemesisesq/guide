angular.module('starter.services', [])


  .factory('GuideFactory', function ($http, ENDPOINT, $q, $cordovaGeolocation, $localstorage) {

    return {
      getGuide: function () {
        var _locInfo = $localstorage.getObject('locInfo');
        //debugger;
        return $http.get(ENDPOINT.url() + '/api/guide/' + _locInfo.zipCode)
          .then(function (data) {
            //debugger;
            // var re = new RegExp(_locInfo.city)
            // var res = _.find(data.data, function (o) {
            //
            //   return re.test(o.data.GridScheduleResult.Name)
            // });
            //
            // //TODO remove this is a temporary fix
            // if (res == undefined) {
            //   res = data.data[0]
            // }

            return data
          })

      },

      getZipCode: function () {
        // debugger;
        if ($localstorage.get('locInfo')) {
          return $q.when($localstorage.get('locInfo'))
        }
        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        return $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            return $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true')
              .then(function (res) {
                console.log(res.data)

                var locInfo = _.chain(res.data.results)
                  .find(function (o) {
                    return _.some(o.types, function (x) {
                      return x === 'postal_code'
                    })
                  })
                  .thru(function (o) {
                    return {
                      zipCode: o.address_components[0].long_name,
                      city: o.address_components[1].long_name,
                    }
                  })
                  .value();

                $localstorage.setObject('locInfo', locInfo);

                return locInfo


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

  .factory('$localstorage', ['$window', function ($window) {

    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }]);
