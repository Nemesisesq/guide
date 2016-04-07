angular.module('ss.login', [])
  .controller('ModalController', function ($scope, http, $ionicModal, PackageFactory, $http, ENDPOINT, $timeout, $window) {


      //$scope.login = 'Click Here to Login'
      $ionicModal.fromTemplateUrl('features/main/modal/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'

      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        //debugger
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function () {
        // Execute action
      });

      $scope.login = function (credentials) {
        //credentials.next = "/api/";
        //credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');

        debugger;
        credentials.submit = "Log in";


        $http({
          method: 'POST',
          url: ENDPOINT.url() + "/o/token/",
          params: {
            client_id: 'A1ndR6olTwaiEoRujXqGIrOjLz7lRtZwViU5lLME',
            username: credentials.username,
            password: credentials.password,
            grant_type: 'password'
          }
        }).then(function (data) {
          debugger;
            console.log(data);
          $window.sessionStorage.token = data.data.access_token

            return $http.get(ENDPOINT.url() + '/api/package/')
          })
          .then(function (data) {
            debugger;
            PackageFactory.setPackage(data.data.results[0]);
            $scope.closeModal();

          }).then($scope.closeModal);

        // http.login(credentials)
        //   .then(function (data) {
        //     console.log(data);
        //
        //     $http.get(ENDPOINT.url() + '/api/package/')
        //       .then(function (data) {
        //         PackageFactory.setPackage(data.data.results[0]);
        //         $scope.closeModal();
        //
        //       }).then($scope.closeModal);
        //
        //     //$rootScope.logged_in = true;
        //     //growl.success('Login Successful', {
        //     //  onclose: function () {
        //     //
        //     //    window.location.reload()
        //     //  },
        //     //  ttl: 1000,
        //     //  disableCountDown: true
        //     //})
        //
        //   })
      };

      $scope.$on('show_login', function (event, args) {
        checkForModal();

        function checkForModal() {
          //debugger
          if ($scope.modal !== undefined) {

            $scope.openModal();

          } else {
            $timeout(checkForModal, 1000)

          }
        }

      })

    }
  );


