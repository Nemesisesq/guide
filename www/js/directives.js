angular.module('guide.directives', [])

  .directive('clickLink', ['$location', '$state', function ($location, $state) {
    return {
      link: function (scope, element, attrs) {
        element.on('click', function () {
          debugger;
          scope.$apply(function () {
            // setTimeout(function(){$location.path(attrs.clickLink);}, 0)
            $state.go('tab.dash-detail');
          });
        });
      }
    }
  }])
  .directive('showDetail', function () {

    return {
      // require: '^DashController',
      // transclude: true,
      controller: 'DashController',
      scope: {
        show: '='
      },

      templateUrl: 'templates/show-detail-description.html',
      link: function (scope, element, attrs, controller) {

      }
    }

  })
.directive('serviceChoice', function(){

  return {
    controller: 'DashController',
    // transclude: true,
    scope : {
      service: '='
    },

    templateUrl : 'templates/choose-how-watch.html',
    link: function (scope, element, attrs, controller) {

    }
  }
})
