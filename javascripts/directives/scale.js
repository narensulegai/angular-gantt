'use strict';

angular.module('ganttDemo')
    .directive('scale', function ($timeout) {
        return {
            templateUrl: 'templates/scale.html',
            restrict: 'A',
            scope: {
                ngBegin: '=',
                ngEnd: '=',
                ngInterval: '=',
                ngFormat: '&'
            },
            link: function postLink(scope, element, attrs) {
                scope.tics = [];

                var formatTic = function (tic) {
                    var t = tic;
                    if (attrs.ngFormat) { //if formatter is specified
                        t = scope.ngFormat({tic: tic});
                    }
                    return t + ''; //to string
                };

                var setTics = function () {
                    scope.tics = _.map(_.range(scope.ngBegin, scope.ngEnd, scope.ngInterval), function (tic) {
                        return {label: formatTic(tic)};
                    });
                    scope.unitLength = element.clientWidth / (scope.ngEnd - scope.ngBegin);
//                    scope.unitLength = element.width() / (scope.ngEnd - scope.ngBegin);

                };

                $timeout(function () {
                    setTics();
                }, 0);

            }
        }
    });
