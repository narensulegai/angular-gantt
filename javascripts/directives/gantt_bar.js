'use strict';

angular.module('ganttDemo')
  .directive('ganttBar', function() {
    return {
      require: '^ganttBarContainer',
      transclude: true,
      templateUrl: 'templates/bar.html',
      restrict: 'A',
      replace: true,
      scope: {
        ngBegin: "=",
        ngEnd: "=",
        ngAllowOverlap: "="
      },
      controller: function($scope) {

        this.move = function(beginOffset, endOffset) {
          $scope.ngBegin = $scope.ngBegin + beginOffset / $scope.unitLength;
          $scope.ngEnd = $scope.ngEnd + endOffset / $scope.unitLength;
        };

        this.getUnitLength = function() {
          return $scope.unitLength;
        };

      },
      link: function postLink(scope, element, attrs, ganttBarContainer) {

        ganttBarContainer.addGanttBar({
          scope: scope,
          element: element
        });

        scope.render = function() {
          ganttBarContainer.render();

          scope.width = (scope.ngEnd - scope.ngBegin) * scope.unitLength;
          scope.marginLeft = (scope.ngBegin - scope.stagger) * scope.unitLength;

          if (scope.ngAllowOverlap) {
            scope.topOffset = 0;
          }
        };

        scope.$watch('ngBegin + ngEnd', function(n, o) {
          if (n != o) {
            scope.render();
          }
        });
        scope.render();
      }
    };
  });
