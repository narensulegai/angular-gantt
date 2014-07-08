'use strict';

angular.module('ganttDemo')
    .controller('SampleGnattChartCtrl', function ($scope) {

        var offset = function (i) {
            return moment().startOf('day').add('hours', i).toDate().getTime();
        };

        $scope.scaleBegin = offset(0);
        $scope.scaleEnd = offset(24);
        $scope.interval = offset(0.5) - offset(0);
        $scope.currentTime = offset(5);
        $scope.highlightRegionStart = offset(6);
        $scope.highlightRegionEnd = offset(7);
        $scope.showDragRegion = false;
        $scope.showResize = false;

        $scope.drag = function (offset, start, end) {
            $scope.showDragRegion = true;
            $scope.dragRegionStart = start + offset;
            $scope.dragRegionEnd = end + offset;
            if (offset > 0) {
                $scope.scrollLeft = $scope.dragRegionEnd;
            } else {
                $scope.scrollLeft = $scope.dragRegionStart;
            }
        };

        $scope.dragEnd = function () {
            $scope.showDragRegion = false;
            return true;
        };

        $scope.resize = function (offset, start) {
            $scope.showResize = true;
            $scope.resizeOffset = start + offset;
            $scope.scrollLeft = $scope.resizeOffset;
        };

        $scope.resizeEnd = function () {
            $scope.showResize = false;
            return true;
        };

        $scope.groups = [
            {
                group: {name: 'Group 1', minimized: false},
                rows: [
                    {
                        label: 'Naren',
                        tasks: [
                            {
                                start: offset(1),
                                end: offset(2),
                                label: 'Third Naren'
                            }
                        ]
                    },
                    {
                        label: 'Parker',
                        tasks: [
                            {
                                start: offset(11),
                                end: offset(13),
                                label: 'Fourth Parker'
                            }
                        ]
                    },
                    {
                        label: 'Zen',
                        tasks: [
                            {
                                start: offset(12),
                                end: offset(13),
                                label: 'Fifth Zen'
                            }
                        ]
                    }
                ]
            },
            {
                group: {name: 'Group 2', minimized: false},
                rows: [
                    {
                        label: 'Aditya',
                        tasks: [
                            {
                                start: offset(6),
                                end: offset(9),
                                label: 'First Aditya'
                            },
                            {
                                start: offset(7),
                                end: offset(10),
                                label: 'First Aditya'
                            }
                        ],
                        shifts: [
                            {
                                start: offset(0),
                                end: offset(6),
                                type: 'OUT'
                            },
                            {
                                start: offset(6),
                                end: offset(19),
                                type: 'IN'
                            }
                        ]
                    },
                    {
                        label: 'Chris',
                        tasks: [
                            {
                                start: offset(7),
                                end: offset(9),
                                label: 'Second Chris'
                            }
                        ],
                        shifts: [
                            {
                                start: offset(0),
                                end: offset(6),
                                type: 'OUT'
                            },
                            {
                                start: offset(6),
                                end: offset(19),
                                type: 'IN'
                            }
                        ]
                    }
                ]
            }
        ];

        $scope.remove = function (row) {
            alert(row.label);
        };

        $scope.addTask = function (bar, groupNum, rowNum) {
            var bar = {start: bar.start, end: bar.end, label: bar.label};
            $scope.groups[groupNum].rows[rowNum].tasks.push(bar);
        };

        $scope.removeTask = function (groupNum, rowNum, barNum) {
            delete $scope.groups[groupNum].rows[rowNum].tasks[barNum];
            $scope.groups[groupNum].rows[rowNum].tasks = _.compact($scope.groups[groupNum].rows[rowNum].tasks);
        };

        $scope.formatTime = function (t) {
            return moment(t).minutes() % 60 ? '•' : moment(t).format('HH:mm');
        };

    });
