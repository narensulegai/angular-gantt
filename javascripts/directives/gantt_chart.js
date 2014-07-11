'use strict';

angular.module('ganttDemo')
  .directive('ganttChart', function() {
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

        scope.scrollTop = 0;

        element[0].onscroll = _.debounce(function(e) {
          scope.scrollTop = e.target.scrollTop;
          scope.$apply();
        }, 0);

        scope.$watch('ngScrollLeft', function() {

//          if (_.isNumber(scope.ngScrollLeft)) {
//            var scrollLeft = ganttChart.getOffset(scope.ngScrollLeft);
//            var ganttRowsEle = element.find('.gantt-rows')[0];
//            var currentScrollLeft = ganttRowsEle.scrollLeft;
//
//            var width = $(ganttRowsEle).width();
//
//            if (scrollLeft <= currentScrollLeft) {
//              ganttRowsEle.scrollLeft = scrollLeft;
//            }
//            if (scrollLeft >= currentScrollLeft + width) {
//              ganttRowsEle.scrollLeft = scrollLeft - width;
//            }
//          }
        });

        scope.render = function() {
          var labels = element[0].querySelector('.gantt-labels');
          var actions = element[0].querySelector('.gantt-actions');

          angular.forEach(scope.rows, function(r) {
            labels.appendChild(r.labelEle);
            actions.appendChild(r.actionEle);
          });
        };

        scope.debRender = _.debounce(scope.render, 100, true);

        scope.formatTic = function(tic) {
          var t = tic;
          if (attrs.ngFormat) { //if formatter is specified
            t = scope.ngFormat({
              tic: tic
            });
          }
          return t + ''; //to string
        };

        scope.$on('$destroy', function() {
          element[0].onscroll = null;
        });
      }
    };
  });