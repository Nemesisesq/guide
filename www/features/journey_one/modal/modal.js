angular.module('ss.login', [])
  .controller('ModalController', function ($scope, http, $ionicModal, PackageFactory, $http, ENDPOINT) {


    //$scope.login = 'Click Here to Login'
    $ionicModal.fromTemplateUrl('features/journey_one/modal/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'

    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
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
      credentials.submit = "Log in";
      http.login(credentials)
        .then(function (data) {
          console.log(data);

          $http.get(ENDPOINT.url + '/json-package/')
            .then(function(data){
              PackageFactory.setPackage(data.data)
            })

          //$rootScope.logged_in = true;
          $scope.closeModal();
          //growl.success('Login Successful', {
          //  onclose: function () {
          //
          //    window.location.reload()
          //  },
          //  ttl: 1000,
          //  disableCountDown: true
          //})

        })
    };

  });


