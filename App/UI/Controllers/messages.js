ferryScheduleApp.controller('MessagesCtrl', function ($scope) {

  /////////////////////////////////////////////////////////////////////////////
  // DATA

  $scope.url = 'http://www.wsdot.com/ferries/schedule/RSSFeeds/RouteAlerts.aspx';
  $scope.updated = 0;
  $scope.feed = [
    {
      link: 'http://google.com',
      date: '[Last Updated 3/27/2014 - 4:00 AM]',
      content: 'Traffic revisions at the Seattle Ferry Terminal - See bulletin page for the details.'
    },
    {
      link: 'http://google.com',
      date: '[Last Updated 3/27/2014 - 4:00 AM]',
      content: 'Sea/BI Update - Bainbridge terminal construction begins Feb 10. Expect detours. See Bulletins page.'
    }
  ];

  /////////////////////////////////////////////////////////////////////////////
  // ACTIONS

  $scope.fetch = function () {
    return;
    var expires = 1000 * 60 * 5;
    var cachedFor = $scope.updated - Date.now();

    if(cachedFor >= expires) {
      var route = config.currentRoute;

      query = [
        $scope.url,
        '?departingterm=' + config.terminals[route.departs],
        '&arrivingterm=' + config.terminals[route.arrives]
      ].join('');

      Feed({url: query, callback: $scope.importFeed});
    }
  };

  $scope.importFeed = function (posts) {
    var newFeed = [];

    $.each(posts.feed.entries, function (index, post) {
      split = Number(post.title.search(/\]/));

      newFeed.push({
        link: post.link,
        content: post.title.substring(split + 1),
        date: post.title.substring(0, split)
      });
    });

    $scope.updated = Date.now();
    $scope.feed = newFeed;
    Storage.set('message_feed', newFeed);

    $scope.$apply();
  }

  /////////////////////////////////////////////////////////////////////////////
  // INIT

  $scope.fetch();

});
