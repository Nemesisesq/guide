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
  .directive('showCard', function () {

    return {
      scope: {
        show: '='
      },

      templateUrl: 'templates/show-detail.html',
      link: function (scope, element, attrs, controller) {

      }
    }

  })
