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
