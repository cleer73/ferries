ferryScheduleApp.controller('RouteCtrl', function ($scope) {

  $scope.info = {
    fromPort: "Bainbridge",
    toPort: "Seattle"
  };

  $scope.alerts = [
    {
      message: '12/17 Comm Meeting 6-8pm at the Bainbridge Island Art Museum 100 Ravine Ln. Bainbridge Island.'
    }
  ];

  $scope.departures = [
    {
      status: "normal",
      west: true,
      east: false,
      departureTime: "4:35pm",
      totalMinutesUntil: 61,
      hoursUntil: 1,
      minutesUntil: 1
    }
  ];

});
