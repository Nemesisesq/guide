angular.module('ss.services')
  .factory('http', function ($http, $log, $q, ENDPOINT, $window) {
    return {
      get: function (url) {
        var deferred = $q.defer();
        $http.get(url)
          .success(function (data) {
            deferred.resolve(
              data
            )
          });
        return deferred.promise;
      },
      getPackage: function () {
        var deferred = $q.defer();
        $http.get(ENDPOINT.url() + '/api/package/')
          .success(function (data) {
            deferred.resolve(
              data.results[0]
            )
          })
          .error(function (e) {
            deferred.reject(e);
            $log.error(e)
          });
        return deferred.promise;
      },
      getRestPackage: function () {
        var deferred = $q.defer();
        $http.get(ENDPOINT.url() + '/api/package')
          .success(function (data) {
            deferred.resolve(
              data.results[0]
            )
          })
          .error(function (e, code) {
            deferred.reject(e);
            $log.error(e, code)
          });
        return deferred.promise;
      },

      putPackage: function (newPackage) {


        var deferred = $q.defer();
        $http.put(newPackage.url, newPackage)
          .success(function (data) {

            deferred.resolve(data)
          })
          .error(function (e) {
            deferred.reject(e);
            $log.error(e)
          });
        return deferred.promise;

      },

      getDetail: function (url) {
        var deferred = $q.defer();
        $http.get(url)
          .success(function (data) {

            deferred.resolve(
              data
            )
          })
          .error(function (e) {
            deferred.reject(e);
            $log.error(e)
          });
        return deferred.promise;
      },

      login: function (credentials) {
        debugger;
        // var deffered = $q.defer();
       // return $http({
       //    method: 'POST',
       //    url: ENDPOINT.url() + "/o/token/",
       //    params : {
       //      client_id : 'A1ndR6olTwaiEoRujXqGIrOjLz7lRtZwViU5lLME',
       //      username : credentials.username,
       //      password : credentials.password,
       //      grant_type : 'password'
       //    }
       //  })
       //    .success(function (data) {
       //      debugger;
       //      $window.sessionStorage.token = data.access_token;
       //      return data
       //    })
       //    .error(function (data, status, headers, config) {
       //      delete $window.sessionStorage.token;
       //      //$log.error(e, code)
       //    });
       //  // return deffered.promise;
      },

      getHardware: function () {
        var deffered = $q.defer();
        $http.get(ENDPOINT.url() + '/api/hardware/')
          .success(function (data) {
            deffered.resolve(data)
          })
          .error(function (e) {
            $log.error(e)
          });
        return deffered.promise;


      }


    }
  });
