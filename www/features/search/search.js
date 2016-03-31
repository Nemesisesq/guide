function slingInProviders(suggestion) {
  return _.some(suggestion.content_provider, 'name', 'SlingTv');
}
/**
 * Created by Nem on 7/18/15.
 */

angular.module('search', [])
  .controller('SearchController', function ($scope,
                                            $rootScope,
                                            $http,
                                            http,
                                            PackageFactory,
                                            _,
                                            Fuse,
                                            N,
                                            ENDPOINT,
                                            $ionicModal) {

    $scope.modelOptions = {
      debounce: {
        default: 500,
        blur: 250
      },
      getterSetter: true
    };


    $scope.suggestions = [];
    $scope.selectedIndex = -1;




    $scope.search = function (val) {

      debugger;

      if (val) {
        //$scope.suggestions = [];
        return $http.get(ENDPOINT.url + '/api/search/?q=' + val)
          .then(function (data) {
            //debugger;

            var sorted = _.sortBy(data.data.results, function (elem) {


              return elem.title.length

            })

            if (data.data.searchText == val) {
              $scope.suggestions = sorted;
              //$scope.loading = false;

              return sorted
            }

            $scope.selectedIndex = -1
          })
          .then($scope.openSuggestionsModal)
      } else {
        $scope.suggestions = [];
        return "hello world"
      }
    };

    $rootScope.addToSelectedShows = function (suggestion, model, label, event) {


      var ssPackage = PackageFactory.getPackage();
      debugger;

      if (_.some(ssPackage.data.content, ['title', suggestion.title])) {
        growl.warning('You already added ' + suggestion.title + ' to your package!')
        return
      }


      if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
        debugger;
        $scope.loading = true
        ssPackage.data.content.push(suggestion);
        PackageFactory.setPackage(ssPackage);

        $scope.loading = false
      }

      $scope.closeSuggestionsModal();
      $scope.searchText = '';
      $scope.suggestions = [];


    };

    $scope.checkKeyDown = function (event) {

      if (event.keyCode === 40) {
        event.preventDefault();
        if ($scope.selectedIndex + 1 !== $scope.suggestions.length) {
          $scope.selectedIndex++;
        }
      } else if (event.keyCode === 38) {
        event.preventDefault();
        if ($scope.selectedIndex - 1 !== -1) {
          $scope.selectedIndex--
        }
      } else if (event.keyCode === 13) {
        $scope.addToSelectedShows($scope.suggestions[$scope.selectedIndex]);
      } else if (event.keyCode === 8) {
        $scope.searchResult = '';
      }

    };


    $scope.$watch('selectedIndex', function (val) {
      if (val !== -1) {
        $scope.searchText = $scope.suggestions[$scope.selectedIndex].title
      }
    });


    //  Search results Modal


    $ionicModal.fromTemplateUrl('suggestions-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openSuggestionsModal = function () {
      $scope.modal.show();
    };
    $scope.closeSuggestionsModal = function () {
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


  })
  .directive('searchShows', function () {
    return {
      templateUrl: 'features/search/search.html',
      controller: 'SearchController',
      restrict: 'E'
    }

  })

