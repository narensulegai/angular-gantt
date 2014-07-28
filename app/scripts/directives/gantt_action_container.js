'use strict';

angular.module('ganttDemo')
  .directive('ganttActionContainer', function() {
    return {
      template: '<div ng-transclude></div>',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element[0].style.position = 'absolute';
      }
    };
  });
