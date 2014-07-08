'use strict';

angular.module('ganttDemo')
    .directive('ganttDragableBar', function () {
        return {
            templateUrl: 'templates/dragable_bar.html',
            restrict: 'A',
            require: '^ganttBar',
            transclude: true,
            scope: {
                ngDragBegin: '&',
                ngDrag: '&',
                ngDragEnd: '&'
            },
            link: function postLink(scope, element, attrs, ganttBar) {

                var mouseOffset , offset = 0;

                element[0].draggable = true;

                element[0].ondragstart = function (e) {
                    mouseOffset = e.clientX;
                    scope.ngDragBegin && scope.ngDragBegin();
                    scope.$apply();
                };

                element[0].ondrag = function (e) {
                    if (e.clientX > 0) {
                        offset = e.clientX - mouseOffset;
                    }
                    scope.ngDrag && scope.ngDrag({$offset: offset / ganttBar.getUnitLength()});
                    scope.$apply();
                };

                element[0].ondragend = function () {
                    var moveBar = function () {
                        ganttBar.move(offset, offset);
                        scope.$apply();
                    };
                    if (_.isUndefined(attrs.ngDragEnd)) {
                        moveBar();
                    } else if (scope.ngDragEnd()) {
                        moveBar();
                    }
                };

                scope.$on('$destroy', function () {
                    element[0].ondragstart = null;
                    element[0].ondrag = null;
                    element[0].ondragend = null;
                });
            }
        };
    });
