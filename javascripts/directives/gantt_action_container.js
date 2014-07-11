'use strict';

angular.module('ganttDemo')
  .directive('ganttActionContainer', function() {
    return {
      templateUrl: 'templates/action_container.html',
      restrict: 'A',
      transclude: true,
      require: '?^ganttRow',
      link: function postLink(scope, element, attrs, ganttRow) {
        element[0].style.position = 'absolute';
        ganttRow.addGanttActionContainer({
          scope: scope,
          element: element,
          attrs: attrs
        });
      }
    };
  });
