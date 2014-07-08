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
                    $scope.debRender();
                }

            },
            link: function (scope, element, attrs, ganttChart) {

                ganttChart.addGanttRow({scope: scope, element: element, attrs: attrs}, scope.index);

                scope.getScale = ganttChart.getScale;

                scope.render = function () {
                    scope.height = scope.ganttBarContainer.element[0].clientHeight;
                    ganttChart.render();
                };

                scope.debRender = _.debounce(scope.render, 300);

                scope.$on('$destroy', function () {
                    ganttChart.removeGanttRow(scope.$id);
                });
            }
        };
    });