'use strict';

angular.module('ganttDemo')
    .directive('ganttLabelContainer', function () {
        return {
            templateUrl: 'templates/label_container.html',
            restrict: 'A',
            transclude: true,
            require: '^?ganttRow',
            link: function postLink(scope, element, attrs, ganttRow) {
                ganttRow.addGanttLabelContainer({
                    scope: scope,
                    element: element,
                    attrs: attrs
                });
            }
        };
    });
