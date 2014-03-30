ferryScheduleApp.controller('NavigationCtrl', function ($scope) {

  $scope.routes = [
    {id: 'clinton-mukilteo',   westPort: 'Clinton',    eastPort: 'Mukilteo'},
    {id: 'kingston-edmonds',   westPort: 'Kingston',   eastPort: 'Edmonds'},
    {id: 'bainbridge-seattle', westPort: 'Bainbridge', eastPort: 'Seattle'},
    {id: 'bremerton-seattle',  westPort: 'Bremerton',  eastPort: 'Seattle'}
  ];

});
