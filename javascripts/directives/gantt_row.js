'use strict';

angular.module('ganttDemo')
  .directive('ganttRow', function() {
    return {
      require: '^ganttChart',
      templateUrl: 'templates/row.html',
      restrict: 'A',
      transclude: true,
      scope: {},
      controller: function($scope) {

        this.getScale = function() {
          return $scope.getScale();
        };

        this.addGanttLabelContainer = function(l) {
          $scope.ganttLabelContainer = l;
        };

        this.addGanttBarContainer = function(e) {
          $scope.ganttBarContainer = e;
        };

        this.addGanttActionContainer = function(a) {
          $scope.ganttActionContainer = a;
        };

        this.render = function() {
          $scope.render();
        }

      },
      link: function(scope, element, attrs, ganttChart) {
        var row = {id: scope.$id, scope: scope, element: element, attrs: attrs,
          labelEle: element[0].querySelector('[gantt-label-container]'),
          actionEle: element[0].querySelector('[gantt-action-container]')};

        ganttChart.addGanttRow(row);

        scope.getScale = ganttChart.getScale;

        scope.render = function() {
          row.actionEle.style.height = row.labelEle.style.height = element[0].clientHeight + 'px';
          row.actionEle.style.position = row.labelEle.style.position = '';
          ganttChart.render();
        };

        scope.$on('$destroy', function() {
          ganttChart.removeGanttRow(scope.$id);
        });
      }
    };
  });