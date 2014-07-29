'use strict';

angular.module('angularGanttChart')
  .directive('ganttChartMarker', function() {
    return {
      templateUrl: 'views/gantt_chart_marker.html',
      restrict: 'A',
      require: '^ganttChart',
      transclude: true,
      replace: true,
      scope: {
        ngBegin: '=',
        ngEnd: '=?'
      },
      link: function postLink(scope, element, attrs, ganttChart) {
        scope.$watch('ngBegin + ngEnd', function() {
          scope.style = {};
          scope.style.left = ganttChart.getOffset(scope.ngBegin);
          if (!_.isUndefined(scope.ngEnd)) {
            scope.style.width = ganttChart.getOffset(scope.ngEnd) - scope.style.left;
          }
        });
      }
    };
  });
