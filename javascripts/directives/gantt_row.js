'use strict';

angular.module('ganttDemo')
    .directive('ganttRow', function () {
        return {
            require: '^ganttChart',
            templateUrl: 'templates/row.html',
            restrict: 'A',
            transclude: true,
            scope: {},
            controller: function ($scope) {

                this.getScale = function () {
                    return $scope.getScale();
                };

                this.addGanttLabelContainer = function (l) {
                    $scope.ganttLabelContainer = l;
                };

                this.addGanttBarContainer = function (e) {
                    $scope.ganttBarContainer = e;
                };

                this.addGanttActionContainer = function (a) {
                    $scope.ganttActionContainer = a;
                };

                this.render = function () {
                    $scope.render();
                }

            },
            link: function (scope, element, attrs, ganttChart) {

                ganttChart.addGanttRow({scope: scope, element: element, attrs: attrs});

                scope.getScale = ganttChart.getScale;

                scope.render = function () {
                    ganttChart.render();
                };

                scope.$on('$destroy', function () {
                    ganttChart.removeGanttRow(scope.$id);
                });
            }
        };
    });