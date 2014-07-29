'use strict';

angular.module('angularGanttChart')
  .directive('ganttChart', function() {
    return {
      templateUrl: 'views/gantt_chart.html',
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
      controller: function($scope, $element) {

        $scope.rows = [];

        this.getScale = function() {
          return {
            ngInterval: $scope.ngInterval,
            ngBegin: $scope.ngBegin,
            ngEnd: $scope.ngEnd
          };
        };

        this.addGanttRow = function(r) {
          $scope.rows.push(r);
        };

        this.removeGanttRow = function(id) {
          angular.forEach($scope.rows, function(r, i) {
            if (r.id == id) {
              $scope.rows[i].labelEle.remove();
              $scope.rows[i].actionEle.remove();
              delete $scope.rows[i];
            }
          });
        };

        this.getOffset = function(offset) {
          return (offset - $scope.ngBegin) * $element[0].querySelector('[scale]').clientWidth / ($scope.ngEnd - $scope.ngBegin);
        };

        this.render = function() {
          $scope.debRender();
        };
      },
      link: function(scope, element, attrs) {

        var debounce = function(func, wait, immediate) {
          var args, result, thisArg, timeoutId;

          function delayed() {
            timeoutId = null;
            if (!immediate) {
              result = func.apply(thisArg, args);
            }
          }

          return function() {
            var isImmediate = immediate && !timeoutId;
            args = arguments;
            thisArg = this;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(delayed, wait);

            if (isImmediate) {
              result = func.apply(thisArg, args);
            }
            return result;
          };
        };

        var formatTic = function(tic) {
          var t = tic;
          if (attrs.ngFormat) { //if formatter is specified
            t = scope.ngFormat({
              tic: tic
            });
          }
          return t + ''; //to string
        };

        var setTics = function() {
          var range = [];

          for (var s = parseFloat(scope.ngBegin); s < parseFloat(scope.ngEnd); s = s + parseFloat(scope.ngInterval)) {
            range.push(s);
          }
          scope.tics = range.map(function(tic) {
            return {label: formatTic(tic)};
          });
          scope.unitLength = element[0].querySelector('.gantt-scale-container').clientWidth / (scope.ngEnd - scope.ngBegin);
        };

        scope.render = function() {
          var rows = element[0].querySelectorAll('[gantt-row] > div');
          var labels = element[0].querySelector('.gantt-labels');
          var actions = element[0].querySelector('.gantt-actions');

          angular.forEach(rows, function(r) {
            var id = angular.element(r).scope().$id;
            var row;
            for (var i = 0; i < scope.rows.length; i++) {
              if (scope.rows[i] && scope.rows[i].id == id) {
                row = scope.rows[i];
              }
            }
            labels.appendChild(row.labelEle);
            actions.appendChild(row.actionEle);
          });
        };

        setTics();

        scope.debRender = debounce(scope.render, 100, true);

        scope.scrollTop = 0;

        element[0].onscroll = debounce(function(e) {
          scope.scrollTop = e.target.scrollTop;
          scope.$apply();
        }, 0);

        scope.$on('$destroy', function() {
          element[0].onscroll = null;
        });
      }
    };
  });