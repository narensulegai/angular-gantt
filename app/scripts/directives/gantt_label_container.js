'use strict';

angular.module('angularGanttChart')
  .directive('ganttLabelContainer', function() {
    return {
      templateUrl: 'views/gantt_label_container.html',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element[0].style.position = 'absolute';
      }
    };
  });