angular.module('starter.services', [])


.factory('GuideFactory', function($http){
  return {
    getGuide : function(){
      return $http.get('http://localhost:8000/guide')
        .then(function (data) {

          return data.data

        })
    },

    callTitan : function() {
      $http.get('http://titavtv.com')
        .then(function (data) {


        })
    }
  }
})

  .factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);
