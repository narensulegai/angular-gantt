angular.module('templates-main', ['views/gantt_action_container.html', 'views/gantt_bar.html', 'views/gantt_bar_container.html', 'views/gantt_chart.html', 'views/gantt_chart_marker.html', 'views/gantt_dragable_bar.html', 'views/gantt_label_container.html', 'views/gantt_resizable_bar.html', 'views/gantt_row.html', 'views/main.html']);

angular.module("views/gantt_action_container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_action_container.html",
    "<div ng-transclude></div>");
}]);

angular.module("views/gantt_bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_bar.html",
    "<div ng-style=\"{width:width + 'px', left:marginLeft + 'px', top:topOffset + 'px'}\" style=\"position: absolute\"\n" +
    "     ng-class=\"{'gantt-bar-overlapped':isOverlapped}\">\n" +
    "  <div ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("views/gantt_bar_container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_bar_container.html",
    "<div ng-transclude></div>");
}]);

angular.module("views/gantt_chart.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_chart.html",
    "<div class=\"gantt-container\">\n" +
    "  <div class=\"gantt-left-container\">\n" +
    "    <div class=\"gantt-label-title\" ng-style=\"{top:scrollTop + 'px'}\">\n" +
    "      {{ ngLabelTitle }}\n" +
    "    </div>\n" +
    "    <div class=\"gantt-labels\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"gantt-body-container\">\n" +
    "    <div class=\"gantt-scale-container\" ng-style=\"{top:scrollTop + 'px'}\">\n" +
    "      <div ng-repeat=\"tic in tics\" class=\"tic\" ng-style=\"{width:ngInterval*unitLength + 'px'}\">\n" +
    "        <div class=\"tic-label\">{{tic.label}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"gantt-row-container\" ng-transclude></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"gantt-right-container\">\n" +
    "    <div class=\"gantt-action-title\" ng-style=\"{top:scrollTop + 'px'}\">\n" +
    "      {{ ngActionTitle }}\n" +
    "    </div>\n" +
    "    <div class=\"gantt-actions\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/gantt_chart_marker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_chart_marker.html",
    "<div ng-transclude class=\"absolute full-height\" ng-style=\"style\" style=\"top: 0\"></div>");
}]);

angular.module("views/gantt_dragable_bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_dragable_bar.html",
    "<div ng-transclude></div>");
}]);

angular.module("views/gantt_label_container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_label_container.html",
    "<div ng-transclude></div>");
}]);

angular.module("views/gantt_resizable_bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_resizable_bar.html",
    "<div ng-transclude></div>");
}]);

angular.module("views/gantt_row.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/gantt_row.html",
    "<div ng-transclude style=\"position: relative\"></div>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<div class=\"header\">\n" +
    "  <ul class=\"nav nav-pills pull-right\">\n" +
    "    <li class=\"active\"><a ng-href=\"#\">Home</a></li>\n" +
    "    <li><a ng-href=\"#\">About</a></li>\n" +
    "    <li><a ng-href=\"#\">Contact</a></li>\n" +
    "  </ul>\n" +
    "  <h3 class=\"text-muted\">angular gantt</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"jumbotron\">\n" +
    "  <h1>'Allo, 'Allo!</h1>\n" +
    "  <p class=\"lead\">\n" +
    "    <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br>\n" +
    "    Always a pleasure scaffolding your apps.\n" +
    "  </p>\n" +
    "  <p><a class=\"btn btn-lg btn-success\" ng-href=\"#\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row marketing\">\n" +
    "  <h4>HTML5 Boilerplate</h4>\n" +
    "  <p>\n" +
    "    HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.\n" +
    "  </p>\n" +
    "\n" +
    "  <h4>Angular</h4>\n" +
    "  <p>\n" +
    "    AngularJS is a toolset for building the framework most suited to your application development.\n" +
    "  </p>\n" +
    "\n" +
    "  <h4>Karma</h4>\n" +
    "  <p>Spectacular Test Runner for JavaScript.</p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"footer\">\n" +
    "  <p><span class=\"glyphicon glyphicon-heart\"></span> from the Yeoman team</p>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('angularGanttChart', [])
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
          scope.tics = _.map(_.range(scope.ngBegin, scope.ngEnd, scope.ngInterval), function(tic) {
            return {label: formatTic(tic)};
          });
          scope.unitLength = element[0].querySelector('.gantt-scale-container').clientWidth / (scope.ngEnd - scope.ngBegin);
        };

        setTics();

        scope.render = function() {
          var rows = element[0].querySelectorAll('[gantt-row] > div');
          var labels = element[0].querySelector('.gantt-labels');
          var actions = element[0].querySelector('.gantt-actions');

          angular.forEach(rows, function(r) {
            var id = angular.element(r).scope().$id;
            var row = _.where(scope.rows, {id: id})[0];
            labels.appendChild(row.labelEle);
            actions.appendChild(row.actionEle);
          });
        };

        scope.debRender = _.debounce(scope.render, 100, true);

        scope.$on('$destroy', function() {
          element[0].onscroll = null;
        });
      }
    };
  });
'use strict';

angular.module('angularGanttChart')
  .directive('ganttBarContainer', function() {
    return {
      templateUrl: 'views/gantt_bar_container.html',
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

          scope.height = 0;

          _.each(scope.bars, function(b) {
            b.scope.topOffset = getTopOffset(b);
            var h = b.scope.topOffset + b.element[0].clientHeight;
            if (scope.height < h) {
              scope.height = h;
            }

            element[0].style.height = scope.height + 'px';

            b.scope.stagger = scope.ngBegin;
            b.scope.unitLength = element[0].clientWidth / (scope.ngEnd - scope.ngBegin);
            b.scope.isOverlapped = isOverlapped(b);
          });

          debRowRenderer();

        };
      }
    };
  });

'use strict';

angular.module('angularGanttChart')
  .directive('ganttBar', function() {
    return {
      require: '^ganttBarContainer',
      templateUrl: 'views/gantt_bar.html',
      transclude: true,
      restrict: 'A',
      replace: true,
      scope: {
        ngBegin: "=",
        ngEnd: "=",
        ngAllowOverlap: "="
      },
      controller: function($scope) {

        this.move = function(beginOffset, endOffset) {
          $scope.ngBegin = $scope.ngBegin + beginOffset / $scope.unitLength;
          $scope.ngEnd = $scope.ngEnd + endOffset / $scope.unitLength;
        };

        this.getUnitLength = function() {
          return $scope.unitLength;
        };

      },
      link: function postLink(scope, element, attrs, ganttBarContainer) {

        ganttBarContainer.addGanttBar({
          scope: scope,
          element: element
        });

        scope.render = function() {
          ganttBarContainer.render();

          scope.width = (scope.ngEnd - scope.ngBegin) * scope.unitLength;
          scope.marginLeft = (scope.ngBegin - scope.stagger) * scope.unitLength;

          if (scope.ngAllowOverlap) {
            scope.topOffset = 0;
          }
        };

        scope.$watch('ngBegin + ngEnd', function(n, o) {
          if (n != o) {
            scope.render();
          }
        });
        scope.render();
      }
    };
  });

'use strict';

angular.module('angularGanttChart')
  .directive('ganttLabelContainer', function() {
    return {
      templateUrl: 'views/gantt_label_container.html',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element[0].style.position = 'absolute';
      }
    };
  });
'use strict';

angular.module('angularGanttChart')
  .directive('ganttActionContainer', function() {
    return {
      templateUrl: 'views/gantt_action_container.html',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element[0].style.position = 'absolute';
      }
    };
  });

'use strict';

angular.module('angularGanttChart')
  .directive('ganttRow', function() {
    return {
      require: '^ganttChart',
      templateUrl: 'views/gantt_row.html',
      restrict: 'A',
      transclude: true,
      scope: {},
      controller: function($scope) {

        this.getScale = function() {
          return $scope.getScale();
        };

        this.render = function() {
          $scope.render();
        }

      },
      link: function(scope, element, attrs, ganttChart) {
        var row = {
          id: scope.$id,
          labelEle: element[0].querySelector('[gantt-label-container]'),
          actionEle: element[0].querySelector('[gantt-action-container]')
        };

        scope.$watch('$parent.$index', function() {
          ganttChart.render();
        });

        ganttChart.addGanttRow(row);

        scope.getScale = ganttChart.getScale;

        scope.render = function() {
          row.actionEle.style.height = row.labelEle.style.height = element[0].clientHeight + 'px';
          row.actionEle.style.position = row.labelEle.style.position = '';
        };

        scope.$on('$destroy', function() {
          ganttChart.removeGanttRow(scope.$id);
        });
      }
    };
  });
'use strict';

angular.module('angularGanttChart')
  .directive('ganttDragableBar', function() {
    return {
      templateUrl: 'views/gantt_dragable_bar.html',
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

        element[0].ondragstart = function(e) {
          mouseOffset = e.clientX;
          scope.ngDragBegin && scope.ngDragBegin();
          scope.$apply();
        };

        element[0].ondrag = function(e) {
          if (e.clientX > 0) {
            offset = e.clientX - mouseOffset;
          }
          scope.ngDrag && scope.ngDrag({$offset: offset / ganttBar.getUnitLength()});
          scope.$apply();
        };

        element[0].ondragend = function() {
          var moveBar = function() {
            ganttBar.move(offset, offset);
            scope.$apply();
          };
          if (_.isUndefined(attrs.ngDragEnd)) {
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

'use strict';

angular.module('angularGanttChart')
  .directive('ganttResizableBar', function() {
    return {
      templateUrl: 'views/gantt_resizable_bar.html',
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

'use strict';

angular.module('angularGanttChart')
  .directive('ganttChartMarker', function() {
    return {
      templateUrl: 'views/gantt_chart_marker.html',
      restrict: 'A',
      require: '^ganttChart',
      transclude: true,
      replace: true,
      scope: {
        ngBegin: '=',
        ngEnd: '=?'
      },
      link: function postLink(scope, element, attrs, ganttChart) {
        scope.$watch('ngBegin + ngEnd', function() {
          scope.style = {};
          scope.style.left = ganttChart.getOffset(scope.ngBegin);
          if (!_.isUndefined(scope.ngEnd)) {
            scope.style.width = ganttChart.getOffset(scope.ngEnd) - scope.style.left;
          }
        });
      }
    };
  });
