'use strict';

angular.module('ganttDemo')
  .directive('ganttResizableBar', function() {
    return {
      template: '<div ng-transclude></div>',
      restrict: 'A',
      transclude: true,
      require: '^ganttBar',
      scope: {
        ngLeftOnly: '=',
        ngDragBegin: '&',
        ngDrag: '&',
        ngDragEnd: '&'
      },
      link: function postLink(scope, element, attrs, ganttBar) {

        var mouseOffset , offset = 0;
        element[0].draggable = true;

        element[0].ondragstart = function(e) {
          e.stopPropagation();
          mouseOffset = e.clientX;
          scope.ngDragBegin && scope.ngDragBegin();
          scope.$apply();
        };

        element[0].ondrag = function(e) {
          e.stopPropagation();
          if (e.clientX > 0) {
            offset = e.clientX - mouseOffset;
          }
          scope.ngDrag && scope.ngDrag({$offset: offset / ganttBar.getUnitLength()});
          scope.$apply();
        };

        element[0].ondragend = function(e) {
          e.stopPropagation();
          var moveBar = function() {
            scope.ngLeftOnly ? ganttBar.move(offset, 0) : ganttBar.move(0, offset);
            scope.$apply();
          };
          if (_.isUndefined(scope.ngDragEnd)) {
            moveBar();
          } else if (scope.ngDragEnd()) {
            moveBar();
          }

        };

        scope.$on('$destroy', function() {
          element[0].ondragstart = null;
          element[0].ondrag = null;
          element[0].ondragend = null;
        });

      }
    };
  });
