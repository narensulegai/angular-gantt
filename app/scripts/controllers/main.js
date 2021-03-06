'use strict';

angular.module('ganttDemo')
  .controller('MainCtrl', function($scope) {

    $scope.showDragRegion = false;
    $scope.showResize = false;

    $scope.drag = function(offset, start, end) {
      $scope.showDragRegion = true;
      $scope.dragRegionStart = start + offset;
      $scope.dragRegionEnd = end + offset;
      if (offset > 0) {
        $scope.scrollLeft = $scope.dragRegionEnd;
      } else {
        $scope.scrollLeft = $scope.dragRegionStart;
      }
    };

    $scope.dragEnd = function() {
      $scope.showDragRegion = false;
      return true;
    };

    $scope.resize = function(offset, start) {
      $scope.showResize = true;
      $scope.resizeOffset = start + offset;
      $scope.scrollLeft = $scope.resizeOffset;
    };

    $scope.resizeEnd = function() {
      $scope.showResize = false;
      return true;
    };

    $scope.scaleBegin = 0;
    $scope.scaleEnd = 10;
    $scope.interval = 1;

    $scope.data = [];

    $scope.data.push({label: 'A', bars: [
        {label: 'A1', start: 2, end: 3},
        {label: 'A2', start: 2, end: 4}
      ]},
      {label: 'B', bars: [
        {label: 'B1', start: 0, end: 1},
        {label: 'B2', start: 4, end: 5}
      ]},
      {label: 'C', bars: [
        {label: 'C1', start: 1, end: 3},
        {label: 'C2', start: 5, end: 6}
      ]},
      {label: 'E', bars: [
        {label: 'E1', start: 1, end: 3},
        {label: 'E2', start: 5, end: 6}
      ]});

    $scope.formatTime = function(t) {
      return t % 2 ? t : '•';
    };

  });