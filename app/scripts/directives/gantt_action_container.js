'use strict';

angular.module('angularGanttChart')
  .directive('ganttActionContainer', function() {
    return {
      templateUrl: 'views/gantt_action_container.html',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element[0].style.position = 'absolute';
      }
    };
  });
