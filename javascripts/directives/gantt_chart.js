'use strict';

angular.module('ganttDemo')
    .directive('ganttChart', function () {
        return {
            templateUrl: 'templates/chart.html',
            restrict: 'A',
            transclude: true,
            scope: {
                ngLabelTitle: '@',
                ngActionTitle: '@',
                ngInterval: '=',
                ngBegin: '=',
                ngEnd: '=',
                ngFormat: '&',
                ngScrollLeft: '=?'
            },
            controller: function ($scope, $element) {

                $scope.rows = {};

                this.getScale = function () {
                    return {
                        ngInterval: $scope.ngInterval,
                        ngBegin: $scope.ngBegin,
                        ngEnd: $scope.ngEnd
                    };
                };

                this.addGanttRow = function (r) {
                    $scope.rows[r.scope.$id] = r;
                    $scope.debRender();
                };

                this.removeGanttRow = function (id) {
                    delete $scope.rows[id];
                    $scope.purge();
                };

                this.getOffset = function (offset) {
                    return (offset - $scope.ngBegin) * $element[0].querySelector('[scale]').clientWidth / ($scope.ngEnd - $scope.ngBegin);
                };

                this.render = function () {
                    $scope.debRender();
                };
            },
            link: function (scope, element, attrs, ganttChart) {

//                element[0].onscroll = _.debounce(function (e) {
//                    scope.scrollTop = $(e.target).scrollTop();
//                    scope.$apply();
//                }, 10);

                scope.$watch('ngScrollLeft', function () {

//                    if (_.isNumber(scope.ngScrollLeft)) {
//                        var scrollLeft = ganttChart.getOffset(scope.ngScrollLeft);
//                        var ganttRowsEle = element.find('.gantt-rows')[0];
//                        var currentScrollLeft = ganttRowsEle.scrollLeft;
//
//                        var width = $(ganttRowsEle).width();
//
//                        if (scrollLeft <= currentScrollLeft) {
//                            ganttRowsEle.scrollLeft = scrollLeft;
//                        }
//                        if (scrollLeft >= currentScrollLeft + width) {
//                            ganttRowsEle.scrollLeft = scrollLeft - width;
//                        }
//                    }
                });

                scope.render = function () {
                    var rowEle = element[0].querySelectorAll('[gantt-row] > div');

                    var labels = _.reduce(rowEle, function (m, e) {
                        if (angular.element(e).scope()) {
                            var r = scope.rows[angular.element(e).scope().$id];

                            if (r.scope.ganttLabelContainer) {
                                r.scope.ganttLabelContainer.element[0].style.height = r.element[0].clientHeight + 'px';
                                m.push(r.scope.ganttLabelContainer.element);
                                element[0].querySelector('.gantt-labels').appendChild(r.scope.ganttLabelContainer.element[0]);
                            }
                        }
                        return m;
                    }, []);

                    var actions = _.reduce(rowEle, function (m, e) {
                        if (angular.element(e).scope()) {
                            var r = scope.rows[angular.element(e).scope().$id];
                            if (r.scope.ganttActionContainer) {
                                r.scope.ganttActionContainer.element[0].style.height = r.element[0].clientHeight + 'px';
                                m.push(r.scope.ganttActionContainer.element);
                                element[0].querySelector('.gantt-actions').appendChild(r.scope.ganttActionContainer.element[0]);
                            }
                        }
                        return m;
                    }, []);

                };
                scope.debRender = _.debounce(scope.render, 300);

                scope.formatTic = function (tic) {
                    var t = tic;
                    if (attrs.ngFormat) { //if formatter is specified
                        t = scope.ngFormat({
                            tic: tic
                        });
                    }
                    return t + ''; //to string
                };

                scope.purge = function () {
                    _.each(element[0].querySelectorAll('[gantt-action-container], [gantt-label-container]'), function (e) {
                        if (angular.element(e).scope().$$destroyed) {
                            angular.element(e).remove();
                        }
                    });
                };

                scope.$on('$destroy', function () {
                    element[0].onscroll = null;
                });
            }
        };
    });
