'use strict';

angular.module('ganttDemo')
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
