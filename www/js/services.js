angular.module('starter.services', [])


  .factory('GuideFactory', function ($http, ENDPOINT, $q) {
    return {
      getGuide: function () {
        debugger;
        return $http.get(ENDPOINT.url + '/guide/')
          .then(function (data) {

            if (_.isEmpty(data.data)) {
              $http.get('http://titantv.com/')
                .then(function (data) {
                  $http.post(ENDPOINT.url + '/guide_reciever/', data.data)
                    .then(function (data) {
                      return data.data

                    })
                })
            } else {
              return data.data
            }

          })
      },

      callTitan: function () {
        $http.get('http://titavtv.com')
          .then(function (data) {


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
