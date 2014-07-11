'use strict';

angular.module('ganttDemo')
  .directive('ganttBarContainer', function() {
    return {
      templateUrl: 'templates/bar_container.html',
      restrict: 'A',
      transclude: true,
      require: '^ganttRow',
      scope: {},
      controller: function($scope) {
        $scope.bars = [];

        this.addGanttBar = function(b) {
          $scope.bars.push(b);
        };

        this.render = function() {
          $scope.render();
        }
      },
      link: function postLink(scope, element, attrs, ganttRow) {
        var debRowRenderer = _.debounce(ganttRow.render, 0);

        scope.render = function() {

          _.extend(scope, ganttRow.getScale());

          var offset = 0;
          var slotsMap = [];

          var doesOverlap = function(s, e, bar_s, bar_e) {
            return (s >= bar_s && s < bar_e) || (e >= bar_s && e < bar_e)
              || (bar_s >= s && bar_e < s) || (bar_s >= s && bar_e < e);
          };

          var getAvailableSlot = function(startPoint, endPoint) {

            return _.min(_.reduce(slotsMap, function(m, bar, i) {
              var overlapped = _.any(slotsMap[i], function(bar) {
                return doesOverlap(startPoint, endPoint, bar.start, bar.end);
              });
              if (!overlapped) {
                m.push(i);
              }
              return m;
            }, [slotsMap.length]));
          };

          var getTopOffset = function(b) {
            if (b.scope.ngAllowOverlap) {
              return 0;
            }
            var i = getAvailableSlot(b.scope.ngBegin, b.scope.ngEnd);

            offset = i * b.element[0].clientHeight;

            var bar = {start: b.scope.ngBegin, end: b.scope.ngEnd};

            if (!slotsMap[i]) {
              slotsMap[i] = [];
            }

            slotsMap[i].push(bar);
            return offset;
          };

          var isOverlapped = function(bar) {
            return _.any(scope.bars, function(b) {
              return bar.scope.$id == b.scope.$id ? false : doesOverlap(b.scope.ngBegin, b.scope.ngEnd, bar.scope.ngBegin, bar.scope.ngEnd);
            });
          };

          scope.height = '';

          _.each(scope.bars, function(b) {
            b.scope.topOffset = getTopOffset(b);
            var h = b.scope.topOffset + b.element[0].clientHeight;
            if (scope.height < h) {
              scope.height = h;
            }
            b.scope.stagger = scope.ngBegin;
            b.scope.unitLength = element[0].clientWidth / (scope.ngEnd - scope.ngBegin);
            b.scope.isOverlapped = isOverlapped(b);
          });

          debRowRenderer();

        };
      }
    };
  });
