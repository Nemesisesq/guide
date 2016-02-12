angular.module('starter.services', [])


  .factory('GuideFactory', function ($http, ENDPOINT, $q) {
    return {
      getGuide: function () {
        debugger;
        return $http.get(ENDPOINT.url + '/guide/')
          .then(function (data) {

            if (_.isEmpty(data.data)) {
              return $http.get('http://titantv.com/')

            } else {
              return data.data
            }
          })
          .then(function (data) {
            return $http.post(ENDPOINT.url + '/guide_reciever/', data.data)


          })
          .then(function (data) {
            return data.data
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
  .factory('ModalFactory', function($window, $rootScope){
    return {
      autoLogin : function(){
        if(_.isEmpty($window.sessionStorage.token)){
          debugger
          $rootScope.$broadcast('show_login',[])

        }
      }
    }
  })
