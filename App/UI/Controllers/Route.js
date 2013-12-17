ferryScheduleApp.controller('RouteCtrl', function ($scope) {

  $scope.info = {
    westPort: "Bainbridge",
    eastPort: "Seattle"
  };

  $scope.alerts = [
    {
      message: '12/17 Comm Meeting 6-8pm at the Bainbridge Island Art Museum 100 Ravine Ln. Bainbridge Island.'
    }
  ];

  $scope.departures = [
    {
      totalMinutesUntil: 1,
      departureTime: "7:55am",
      minutesUntil: 1,
      hoursUntil: 0,
      status: "alert",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 51,
      departureTime: "8:45am",
      minutesUntil: 51,
      hoursUntil: 0,
      status: "good",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 101,
      departureTime: "9:35am",
      minutesUntil: 41,
      hoursUntil: 1,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 106,
      departureTime: "9:40am",
      minutesUntil: 46,
      hoursUntil: 1,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 151,
      departureTime: "10:25am",
      minutesUntil: 31,
      hoursUntil: 2,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 166,
      departureTime: "10:40am",
      minutesUntil: 46,
      hoursUntil: 2,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 211,
      departureTime: "11:25am",
      minutesUntil: 31,
      hoursUntil: 3,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 216,
      departureTime: "11:30am",
      minutesUntil: 36,
      hoursUntil: 3,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 266,
      departureTime: "12:20pm",
      minutesUntil: 26,
      hoursUntil: 4,
      status: "normal",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 316,
      departureTime: "1:10pm",
      minutesUntil: 16,
      hoursUntil: 5,
      status: "normal",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 371,
      departureTime: "2:05pm",
      minutesUntil: 11,
      hoursUntil: 6,
      status: "normal",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 421,
      departureTime: "2:55pm",
      minutesUntil: 1,
      hoursUntil: 7,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 426,
      departureTime: "3:00pm",
      minutesUntil: 6,
      hoursUntil: 7,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 471,
      departureTime: "3:45pm",
      minutesUntil: 51,
      hoursUntil: 7,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 476,
      departureTime: "3:50pm",
      minutesUntil: 56,
      hoursUntil: 7,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 521,
      departureTime: "4:35pm",
      minutesUntil: 41,
      hoursUntil: 8,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 526,
      departureTime: "4:40pm",
      minutesUntil: 46,
      hoursUntil: 8,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 576,
      departureTime: "5:30pm",
      minutesUntil: 36,
      hoursUntil: 9,
      status: "normal",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 626,
      departureTime: "6:20pm",
      minutesUntil: 26,
      hoursUntil: 10,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 636,
      departureTime: "6:30pm",
      minutesUntil: 36,
      hoursUntil: 10,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 676,
      departureTime: "7:10pm",
      minutesUntil: 16,
      hoursUntil: 11,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 686,
      departureTime: "7:20pm",
      minutesUntil: 26,
      hoursUntil: 11,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 736,
      departureTime: "8:10pm",
      minutesUntil: 16,
      hoursUntil: 12,
      status: "normal",
      west: true,
      east: true
    },
    {
      totalMinutesUntil: 781,
      departureTime: "8:55pm",
      minutesUntil: 1,
      hoursUntil: 13,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 786,
      departureTime: "9:00pm",
      minutesUntil: 6,
      hoursUntil: 13,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 831,
      departureTime: "9:45pm",
      minutesUntil: 51,
      hoursUntil: 13,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 851,
      departureTime: "10:05pm",
      minutesUntil: 11,
      hoursUntil: 14,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 901,
      departureTime: "10:55pm",
      minutesUntil: 1,
      hoursUntil: 15,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 941,
      departureTime: "11:35pm",
      minutesUntil: 41,
      hoursUntil: 15,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 981,
      departureTime: "12:15am",
      minutesUntil: 21,
      hoursUntil: 16,
      status: "normal",
      west: true,
      east: false
    },
    {
      totalMinutesUntil: 1021,
      departureTime: "12:55am",
      minutesUntil: 1,
      hoursUntil: 17,
      status: "normal",
      west: false,
      east: true
    },
    {
      totalMinutesUntil: 1061,
      departureTime: "1:35am",
      minutesUntil: 41,
      hoursUntil: 17,
      status: "normal",
      west: true,
      east: false
    }
  ];

});
